import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from './../../services/user/user.service';
import { SingUpUserRequest } from '../../../models/interfaces/user/SingUpUserRequest'
import { AuthRequest } from './../../../models/interfaces/user/auth/authRequest';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
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
    private messageService: MessageService
    ) {};

  onSubmitLoginForm(): void {
    if(this.loginForm.value && this.loginForm.valid){
      this.userService.authUser(this.loginForm.value as AuthRequest)
      .subscribe({
        next:(response)=>{
          if(response){
            this.cookieService.set('USER_INFO', response?.token);
            this.loginForm.reset();

            this.messageService.add({
              severity:'sucess',
              summary:'Sucesso',
              detail: `Bem vindo de volta ${response?.name}!`,
              life:2000,
            });
          }
        },
        error:(error)=>{
          this.messageService.add({
          severity:'error',
          summary:'Erro',
          detail: 'Erro ao realizar login.',
          life:2000,
        });},

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

            this.messageService.add({
              severity:'sucess',
              summary:'Sucesso',
              detail: `Usuário ${response?.name} cadastrado com sucesso!`,
              life:2000,
            });
          }
        },
        error:(error) => {this.messageService.add({
          severity:'error',
          summary:'Erro',
          detail: 'Erro ao cadastrar usuário.',
          life:2000,})},
      });
    }
  };
}


