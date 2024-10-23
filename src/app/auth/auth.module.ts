import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  declarations: [
    LoginComponent,   
    RegisterComponent, RecoverPasswordComponent, ChangePasswordComponent 
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    HttpClientModule,
    
  ]
})
export class AuthModule { }

