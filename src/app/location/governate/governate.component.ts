import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Governate } from "./model/governate.model";
import { ToastrService } from "ngx-toastr";
import { GovernateService } from "shared/services/governate.service";
import { HandleErorrService } from "shared/services/handleErorr.service";

@Component({
  selector: "app-governate",
  templateUrl: "./governate.component.html",
  styleUrls: ["./governate.component.css"]
})
export class GovernateComponent implements OnInit {
  @ViewChild("governateForm", { static: false })
  governateForm: NgForm;

  //modes
  editMode = false;
  isLoading = false;

  //arrays and tabale array
  public columns: any;
  public rows: Governate[] = [];
  governateData: Governate[] = [];

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
  constructor(
    private governateServ: GovernateService,
    private toastr: ToastrService,
    private handelErorr: HandleErorrService
  ) {
    this.columns = [
      { name: "Governate Code" },
      { name: "Governate Name" },
      { name: "Edit" },
      { name: "Delete" }
    ];
  }

  ngOnInit() {
    this.postGovernate();
  }

  //create
  onCreatGovernate(governate: NgForm) {
    const val = governate.value;

    if (this.editMode) {
      this.governateServ
        .updateGovernate(this.governateId, val.GovernorateName)
        .subscribe((res: any) => {
          if (res.statusCode == 200) {
            let data: Governate = {
              GovernorateName: val.GovernorateName,
              GovernorateID: res.Data
            };
            this.succces = "Successfully Updated";
            this.showToasterSuccess(this.succces);
            this.governateData.unshift(data);
            this.governateData = this.governateData.slice();
          } else {
            this.handelErorr.handleErorr(res);
          }
        });
      this.editMode = false;
      this.onResetGovernateFrom();
    } else {
      this.governateServ
        .creatStoreGovernate(val.GovernorateName)
        .subscribe((res: any) => {
          console.log(res);
          if (res.statusCode == 200) {
            let data: Governate = {
              GovernorateName: val.GovernorateName,
              GovernorateID: res.Data
            };
            this.governateData.unshift(data);
            this.governateData = this.governateData.slice();
            this.succces = "Successfully Added";
            this.showToasterSuccess(this.succces);
            this.onResetGovernateFrom();
          } else {
            this.handelErorr.handleErorr(res);
          }
        });
    }
  }

  //show category in tabel
  postGovernate() {
    this.isLoading = true;
    this.governateServ.getGovernate().subscribe((governate: any) => {
      this.governateData = governate.Data;
      this.isLoading = false;
    });
  }

  //clear the form
  onResetGovernateFrom() {
    this.governateForm.reset();
    this.editMode = false;
    this.governateId = 0;
  }

  //delet
  onDeletGovernate(governate: Governate, i) {
    this.governateServ.deletGovernate(governate.GovernorateID).subscribe(
      (res: any) => {
        if (res.statusCode == 200) {
          this.governateData.splice(i, 1);
          this.governateData = this.governateData.slice();
          this.onResetGovernateFrom();
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

  governateId = 0;

  onUpdateGovernate(governate: Governate, i) {
    this.editMode = true;
    this.governateForm.setValue({
      GovernorateID: governate.GovernorateID,
      GovernorateName: governate.GovernorateName
    });
    this.governateId = governate.GovernorateID;
    this.governateData.splice(i, 1);
  }
}
