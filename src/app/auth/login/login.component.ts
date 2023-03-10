import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  
  loginForm: FormGroup = this.fb.group({
    'email': ['', [Validators.required, Validators.email]],
    'password': ['', [Validators.required, Validators.minLength(6)]]
  });

  loading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  private loginOkNotification(u: User) {
    this.snackBar.open(
      'Logado com sucesso! Seja bem vindo' + u.firstname, 
      'Ok', 
      {duration: 2000}
    )
  }

  private loginErrorNotification(err) {
    this.snackBar.open(
      err, 
      'Ok', 
      {duration: 2000}
    )
  }

  onSubmit() {
    this.loading = true;
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.authService.login(
        email, 
        password)
        .subscribe(
          (u) => {
            this.loginOkNotification(u);
            this.router.navigateByUrl('/');
            this.loading = false;
          },
          (err) => {
            this.loginErrorNotification(err);
            this.loading = false;
          }
        )
  }

  loginGoogle() {
    this.loading = true;
    this.authService.loginGoogle().subscribe(
      (u) => {
        this.loginOkNotification(u);
        this.router.navigateByUrl('/');
        this.loading = false;
      },
      (err) => {
        console.log('Erro no login google: ', err);
        
        this.loginErrorNotification(err);
        this.loading = false;
      }
    );
  }

}
