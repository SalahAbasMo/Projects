import { NgForm } from "@angular/forms";
import { Component, OnInit, Output, Input } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "shared/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  isLogIn = false;
  isLoading = false;
  error: string = null;
  constructor(private authServ: AuthService, private router: Router) {}

  ngOnInit() {}

  onLogin(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const UserName = form.value.email;
    const password = form.value.password;

    this.isLoading = true;
    if (this.isLoading) {
      this.authServ.login(UserName, password).subscribe(
        resp => {
          console.log(resp);
          this.isLoading = false;
          this.router.navigate(["/"]);
        },
        errMsg => {
          console.log(errMsg);
          this.error = errMsg;
          this.isLoading = false;
        }
      );
    }
  }
}
