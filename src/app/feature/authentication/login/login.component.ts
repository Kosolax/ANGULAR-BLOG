import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { UserLogin } from '../../../model/UserLogin';
import { takeUntil } from 'rxjs';
import { BaseComponent } from '../../../shared/components/base/base.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit {
  private returnUrl: string = '';
  loginForm: FormGroup = {} as FormGroup;
  errorMessage: string = '';
  showError: boolean = false;

  constructor(private authService: AuthenticationService, private router: Router, private route: ActivatedRoute) {
      super();
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    })

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.authService.authChanged.pipe(takeUntil(this.notifier))
      .subscribe((value) => {
        if (value) {
          this.router.navigate([this.returnUrl]);
        }
    });

    this.authService.authChangeError.pipe(takeUntil(this.notifier))
      .subscribe((value) => {
        this.errorMessage = value;
        this.showError = this.errorMessage != "";
      });
  }

  validateControl = (controlName: string) => {
    const control = this.loginForm.get(controlName);
    if (this.loginForm != null && control != null) {
      return control.invalid && control.touched
    }

    return false;
  }

  hasError = (controlName: string, errorName: string) => {
    const control = this.loginForm.get(controlName);
    if (this.loginForm != null && control != null) {
      return control.hasError(errorName)
    }

    return false;
  }

  loginUser = (loginFormValue: any) => {
    this.showError = false;
    const login = { ...loginFormValue };
    const userForAuth: UserLogin= {
      email: login.username,
      password: login.password
    }

    this.authService.loginUser(userForAuth);
  }
}
