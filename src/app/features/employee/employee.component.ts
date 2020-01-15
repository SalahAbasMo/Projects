import { Employee } from "./models/employee.model";
import { FormGroup, FormControl, Validators, NgForm } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { EmployeeServiceService } from "shared/services/employee-service.service";
import { HandleErorrService } from "shared/services/handleErorr.service";

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.css"]
})
export class EmployeeComponent implements OnInit {
  //modes
  editMode = false;
  isLoading = false;

  //arrays and tabale array
  public columns: any;
  public rows: Employee[] = [];
  employeData: Employee[] = [];

  //msgssssss
  error: string = null;
  succces: string = null;
  popoverTitle = "Are You Sure ?";
  popoverMessage = "Are you really <b>sure</b> you want to delete this?";

  //toaster msg
  showToasterSuccess(msg) {
    this.toastr.success(msg);
  }
  showToasterErorr(msg) {
    this.toastr.error(msg);
  }

  //employee class and form
  employee: Employee = new Employee();
  employeeForm: FormGroup;

  constructor(
    private employeeServ: EmployeeServiceService,
    private toastr: ToastrService,
    private handelErorr: HandleErorrService
  ) {
    this.columns = [
      { name: "Employee Name" },
      { name: "Employee Code" },
      { name: "Active" },
      { name: "Edit" },
      { name: "Delete" }
    ];
  }

  ngOnInit() {
    this.employeeForm = new FormGroup({
      EmployeeName: new FormControl(null, Validators.required),
      Inactive: new FormControl(false),
      EmployeeId: new FormControl({ Number, disabled: true })
    });
    this.postEmployee();
  }

  //create
  onCreatEmployee(employee: FormGroup) {
    const val = employee.value;

    if (this.editMode) {
      this.employeeServ
        .updateEmployee(val.EmployeeName, this.employeId, val.Inactive)
        .subscribe((res: any) => {
          if (res.statusCode == 200) {
            let data: Employee = {
              EmployeeName: val.EmployeeName,
              EmployeeID: +res.Data,
              Inactive: val.Inactive
            };
            this.succces = "Successfully Updated";
            this.showToasterSuccess(this.succces);
            this.employeData.unshift(data);
            this.employeData = this.employeData.slice();
          } else {
            this.handelErorr.handleErorr(res);
          }
        });
      this.editMode = false;
      this.onResetEmployeeFrom();
    } else {
      this.employeeServ
        .creatStoreEmployee(val.EmployeeName, val.Inactive)
        .subscribe((res: any) => {
          if (res.statusCode == 200) {
            let data: Employee = {
              EmployeeName: val.EmployeeName,
              Inactive: val.Inactive,
              EmployeeID: +res.Data
            };
            this.employeData.unshift(data);
            this.employeData = this.employeData.slice();
            this.succces = "Successfully Added";
            this.showToasterSuccess(this.succces);
            this.onResetEmployeeFrom();
          } else {
            this.handelErorr.handleErorr(res);
          }
        });
    }
  }

  //getting cemployee data in tabel
  postEmployee() {
    this.isLoading = true;
    this.employeeServ.getEmployee().subscribe((employers: any) => {
      this.employeData = employers.Data.Data;
      console.log(employers.Data.Data);
      this.isLoading = false;
    });
  }

  //clear the form
  onResetEmployeeFrom() {
    this.employeeForm.reset();
    this.employeId = 0;
    this.active = false;
    this.editMode = false;
  }

  //delet
  onDeletEmployee(employee: Employee, i) {
    this.employeeServ.deletEmployee(employee.EmployeeID).subscribe(
      (res: any) => {
        if (res.statusCode == 200) {
          this.employeData.splice(i, 1);
          this.employeData = this.employeData.slice();
          this.onResetEmployeeFrom();
          this.succces = "Successfully Deleted";
          this.showToasterSuccess(this.succces);
        } else {
          this.handelErorr.handleErorr(res);
        }
      },
      err => {
        let errmsg = "Not Authorized to Delet this ";
        this.showToasterErorr(errmsg);
      }
    );
  }

  employeId = 0;
  active: boolean = true;
  onUpdateEmployee(employee: Employee, i) {
    this.editMode = true;
    this.employeeForm.setValue({
      EmployeeName: employee.EmployeeName,
      Inactive: employee.Inactive,
      EmployeeId: employee.EmployeeID
    });
    this.employeId = employee.EmployeeID;
    this.employeData.splice(i, 1);
  }
}
