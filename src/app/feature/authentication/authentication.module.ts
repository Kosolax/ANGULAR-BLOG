import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../../core/core.module';
@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    RouterModule.forChild([
      { path: 'connect', component: LoginComponent },
    ])
  ]
})
export class AuthenticationModule { }
