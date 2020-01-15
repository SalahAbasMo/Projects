import { HandleErorrService } from "./handleErorr.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
import { User } from "app/auth/login/user.model";

export interface Data {
  UserName: string;
  IsLogin: boolean;
  Token: string;
  Id: number;
}

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  user = new BehaviorSubject<User>(null);
  tokenExpiration: any;

  url = "http://10.0.0.35:5252/api/auth/login";

  login(UserName: string, password: string) {
    return this.http
      .post<Data>(this.url, {
        UserName: UserName,
        password: password
      })
      .pipe();
  }

  logout() {
    this.user.next(null);
    this.router.navigate(["/login"]);
    localStorage.removeItem("userData");
    if (this.tokenExpiration) {
      clearTimeout(this.tokenExpiration);
    }
    this.tokenExpiration = null;
  }

  // autoLogout(expirationDuration: number) {
  // 	this.tokenExpiration = setTimeout(() => {
  // 		this.logout();
  // 	}, expirationDuration);
  // }
  private handleUserAuth(
    UserName: string,
    Id: number,
    token: string,
    IsLogin: boolean
  ) {
    const user = new User(UserName, Id, token, IsLogin);
    this.user.next(user);
    localStorage.setItem("userData", JSON.stringify(user));
  }

  // autoLogin() {
  // 	const userData: {
  // 		email: string;
  // 		id: string;
  // 		_token: string;
  // 		_tokenExpirationDate: string;
  // 	} = JSON.parse(localStorage.getItem('userData'));
  // 	if (!userData) {
  // 		return;
  // 	}
  // 	const LoadedUser = new User(
  // 		userData.email,
  // 		userData.id,
  // 		userData._token,
  // 		new Date(userData._tokenExpirationDate)
  // 	);
  // 	if (LoadedUser.token) {
  // 		this.user.next(LoadedUser);
  // 		const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
  // 		this.autoLogout(expirationDuration);
  // 	}
  // }
}
