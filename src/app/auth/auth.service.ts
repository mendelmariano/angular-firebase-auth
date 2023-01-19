import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, from, throwError, of } from 'rxjs';
import { User } from './user';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth) { }

  private userCollection: AngularFirestoreCollection<User> = this.afs.collection('users');

  register(user: User): Observable<boolean> {
    return from(this.afAuth
        .createUserWithEmailAndPassword(user.email, user.password))
        .pipe(
          switchMap(
            (u: any) => {
              return this.userCollection.doc(u.user.uid)
              .set({...user, id: u.user.uid})
              .then(()=>true)
            }  
          ),
          catchError((err)=> throwError(err))
    )
  }

  
  login(email: string, password: string): Observable<User> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password))
      .pipe(
        switchMap((u: any) => {
          return this.userCollection.doc<User>(u.user.uid).valueChanges()
        }
      ), 
      catchError((err)=> throwError('Credenciais invalidas ou usuário não registrado. ', err))
      )
  }

  logout() {
    this.afAuth.signOut();
  }

  getUser(): Observable<User> {
    return this.afAuth.authState.pipe(
      switchMap(
        u =>  (u) ? 
          this.userCollection.doc<User>(u.uid).valueChanges() : of(null))
    )
  }

  authenticated(): Observable<boolean> {
    return this.afAuth.authState.pipe(map(u =>  (u) ? true : false))
  }


  async updateUserDate(u: firebase.auth.UserCredential ) {
    try {
      const newUser: User = {
        firstname: u.user.displayName,
        lastname: '',
        address: '',
        city: '',
        state: '',
        email: u.user.email,
        password: '',
        id: u.user.uid
      };
      await this.userCollection.doc(u.user.uid).set(newUser);
      return newUser
    } catch(e) {
      throw new Error(e);
    }
  }

  async loginWithGoogleAccount() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      let credentials: firebase.auth.UserCredential = await this.afAuth.signInWithPopup(provider);
      let user: User = await this.updateUserDate(credentials);
      return user;
    }
    catch(e) {
      throw new Error(e);
    }

  }

  loginGoogle(): Observable<User> {
    return from(this.loginWithGoogleAccount())
  }

  oldLoginGoogle(): Observable <User> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return from(this.afAuth.signInWithPopup(provider))
      .pipe(
        tap((data) => console.log(data)),
        switchMap(
          (u: any) => {
            console.log('Usuário vindo do login google: ', u);
            
            const newUser: User = {
              firstname: u.user.displayName,
              lastname: '',
              address: '',
              city: '',
              state: '',
              email: u.user.email,
              password: '',
              id: u.user.uid
            };
            return this.userCollection.doc(u.user.uid).set(newUser).then(()=> newUser);
          }
        )
      );
  }



}
