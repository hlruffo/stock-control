import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  loginCard: boolean = true;

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    senha: ['', Validators.required],
  });

  signUpForm = this.formBuilder.group({
    nome: ['', Validators.required],
    email: ['', Validators.required],
    senha: ['', Validators.required]
  })

  constructor(private formBuilder: FormBuilder) {


  };

  onSubmitLoginForm(): void {
    console.log(this.loginForm.value)
  };

  onSubmitsignUpForm(): void {
    console.log(this.signUpForm.value)
  };
}


