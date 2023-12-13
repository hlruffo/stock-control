import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from './../../services/user/user.service';
import { SingUpUserRequest } from '../../../models/interfaces/user/SingUpUserRequest'
import { AuthRequest } from './../../../models/interfaces/user/auth/authRequest';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  loginCard: boolean = true;

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  signUpForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cookieService: CookieService,
    ) {};

  onSubmitLoginForm(): void {
    if(this.loginForm.value && this.loginForm.valid){
      this.userService.authUser(this.loginForm.value as AuthRequest)
      .subscribe({
        next:(response)=>{
          if(response){
            this.cookieService.set('USER_INFO', response?.token);
            this.loginForm.reset();
          }
        },
        error:(error)=>console.log(error),
      });
    }
  };

  onSubmitsignUpForm(): void {
    if(this.signUpForm.value && this.signUpForm.valid){
      this.userService.signUpUser(this.signUpForm.value as SingUpUserRequest)
      .subscribe({
        next:(response)=>{
          if(response){
            alert('Usuário cadastrado com sucesso!');
            this.signUpForm.reset();
            this.loginCard = true;
          }
        },
        error:(error) => console.log(error),
      });
    }
  };
}


