import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserLogin } from '../../model/UserLogin';
import { AuthResponse } from '../../model/AuthResponse';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authChangeSub = new BehaviorSubject<boolean>(false)
  private authChangeErrorSub = new BehaviorSubject<string>("")
  private roleChangeSub = new BehaviorSubject<boolean>(false)

  public authChanged = this.authChangeSub.asObservable();
  public authChangeError = this.authChangeErrorSub.asObservable();
  public roleChanged = this.roleChangeSub.asObservable();

  constructor(private jwtHelper: JwtHelperService, private httpClient: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  public isUserAuthenticated() {
    const token = localStorage.getItem("token");
    const isExpired: boolean = this.jwtHelper.isTokenExpired(token);

    return token != undefined && !isExpired;
  }

  public isUserAdmin = (): boolean => {
    const token: string | null = localStorage.getItem("token");
    if (token != null) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      if (decodedToken != null) {
        const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
        return role === 'Administrator';
      }
    }

    return false;
  }

  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this.authChangeSub.next(isAuthenticated);
    this.roleChangeSub.next(this.isUserAdmin());
  }

  public loginUser = (body: UserLogin) => {
    (this.httpClient.post<AuthResponse>(this.baseUrl + "accounts/login", body))
      .subscribe({
        next: (res: AuthResponse) => {
          localStorage.setItem("token", res.token);
          this.sendAuthStateChangeNotification(res.isAuthSuccessful);
          this.authChangeErrorSub.next("");
        },
        error: (err: HttpErrorResponse) => {
          this.authChangeErrorSub.next(err.message);
        }
      })
  }

  public logout = () => {
    localStorage.removeItem("token");
    this.sendAuthStateChangeNotification(false);
  }
}
