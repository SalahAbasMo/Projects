import { TokenService } from "./token.service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Employee } from "app/features/employee/models/employee.model";

@Injectable({
  providedIn: "root"
})
export class EmployeeServiceService {
  constructor(private http: HttpClient, private token: TokenService) {}
  employee: Employee = new Employee();

  url = "http://10.0.0.35:9999/api/";
  //Category
  creatStoreEmployee(EmployeeName: string, Inactive: boolean) {
    const employeeData: Employee = {
      EmployeeName: EmployeeName,
      Inactive: Inactive
    };
    return this.http.post(
      this.url + "Employee/add",
      employeeData,
      this.token.getHeaders
    );
  }

  getEmployee() {
    return this.http.get(this.url + "Employee/list", this.token.getHeaders);
  }
  updateEmployee(EmployeeName: string, EmployeeID: number, Inactive: boolean) {
    const employeeData: Employee = {
      Inactive: Inactive,
      EmployeeID: EmployeeID,
      EmployeeName: EmployeeName
    };
    return this.http.post(
      this.url + "Employee/edit",
      employeeData,
      this.token.getHeaders
    );
  }

  deletEmployee(employeeId) {
    return this.http.post(
      this.url + "Employee/Delete?employeeId=" + employeeId,
      "",
      this.token.getHeaders
    );
  }
}
