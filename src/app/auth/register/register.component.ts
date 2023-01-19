import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup = this.fb.group({
    'firstname': ['', [Validators.required]],
    'lastname': ['', [Validators.required]],
    'address': ['', []],
    'city': ['', []],
    'state': ['', []],
    'phone': ['', []],
    'mobilephone': ['', []],
    'email': ['', [Validators.required, Validators.email]],
    'password1': ['', [Validators.required, Validators.minLength(6)]],
    'password2': ['', [Validators.required, Validators.minLength(6)]]
  }, 
  { validator: this.matchingPasswords});

  states = ['GO', 'MG', 'DF', 'RJ'];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
  }

  matchingPasswords(group: FormGroup) {
    if(group){
      const password1 = group.controls ['password1'].value;
      const password2 = group.controls ['password2'].value;
      if (password1 === password2) {
        return null}
    }
    return { matching: false}
  }

  onSubmit() {
    let newUser = this.formRegister.getRawValue() as User;
    newUser.password = this.formRegister.get('password1').value;
    delete(newUser.password1);
    delete(newUser.password2);    

    this.authService.register(newUser)
      .subscribe(
        (u) => {
          this.snackBar.open('Usuário registrado. Use os dados para logar', 'Ok',
          {duration: 2000});
          this.router.navigateByUrl('/auth/login');
        },
        (err) => {
          console.log(err);
          this.snackBar.open('Erro! Você não foi registrado', 'Ok',
          {duration: 2000});
          this.router.navigateByUrl('/auth/login');
          
        }
      )
  }

}
