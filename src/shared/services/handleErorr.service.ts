import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { ToastrService } from "ngx-toastr";

import { HttpErrorResponse } from "@angular/common/http";
@Injectable({
  providedIn: "root"
})
export class HandleErorrService {
  constructor(private toastr: ToastrService) {}
  error: string = null;
  succces: string = null;

  showToasterSuccess(msg) {
    this.toastr.success(msg);
  }
  showToasterErorr(msg) {
    this.toastr.error(msg);
  }

  handleErorr(res: any) {
    if (res.statusCode == 204 && res.Data == 3) {
      this.error = "code is taken chosee another one";
      this.showToasterErorr(this.error);
    } else if (res.statusCode == 204 && res.Data == 0) {
      this.error = "error from server";
      this.showToasterErorr(this.error);
    } else if (res.statusCode == 204 && res.Data == 1) {
      this.error = "error from server";
      this.showToasterErorr(this.error);
    } else if (res.statusCode == 204 && res.Data == 2) {
      this.error = "check your data";
      this.showToasterErorr(this.error);
    } else if (res.statusCode == 204 && res.Data == 4) {
      this.error = "name is taken chosee another one";
      this.showToasterErorr(this.error);
    } else if (res.statusCode == 204 && res.Data == 51) {
      this.error = "delet subcategory first";
      this.showToasterErorr(this.error);
    } else if (res.statusCode == 204 && res.Data == 52) {
      this.error = "delet Region first";
      this.showToasterErorr(this.error);
    } else if (res.statusCode == 204 && res.Data == 53) {
      this.error = "delet commercial register first";
      this.showToasterErorr(this.error);
    } else if (res.statusCode == 204 && res.Data == 54) {
      this.error = "delet city first";
      this.showToasterErorr(this.error);
    } else if (res.statusCode == 204 && res.Data == 55) {
      this.error = "delet cirtefcation first";
      this.showToasterErorr(this.error);
    } else {
      this.error = "Error";
      this.showToasterErorr(this.error);
      console.log(res);
    }
  }
}
