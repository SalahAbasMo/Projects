import { ShahrAqary } from "./model/shahr-aqary.model";
import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ShahrAqaryService } from "shared/services/shahr-aqary.service";
import { HandleErorrService } from "shared/services/handleErorr.service";

@Component({
  selector: "app-shahr-aqary",
  templateUrl: "./shahr-aqary.component.html",
  styleUrls: ["./shahr-aqary.component.css"]
})
export class ShahrAqaryComponent implements OnInit {
  @ViewChild("shahrAqaryForm", { static: false })
  shahrAqaryForm: NgForm;

  //modes
  editMode = false;
  isLoading = false;

  //arrays and tabale array
  public columns: any;
  public rows: ShahrAqary[] = [];
  shahrAqaryData: ShahrAqary[] = [];

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
    private shahrAqaryServ: ShahrAqaryService,
    private toastr: ToastrService,
    private handelErorr: HandleErorrService
  ) {
    this.columns = [
      { name: "Shahr-Aqary Code" },
      { name: "Shahr-Aqary Name" },
      { name: "Edit" },
      { name: "Delete" }
    ];
  }

  ngOnInit() {
    this.postShahrAqary();
  }

  //create
  onCreatMaktb(shahrAqary: NgForm) {
    const val = shahrAqary.value;

    if (this.editMode) {
      this.shahrAqaryServ
        .updateShahrAqary(this.shahrAqaryId, val.ShahrAqaryName)
        .subscribe((res: any) => {
          if (res.statusCode == 200) {
            let data: ShahrAqary = {
              ShahrAqaryName: val.ShahrAqaryName,
              ShahrAqaryID: +res.Data
            };
            this.succces = "Successfully Updated";
            this.showToasterSuccess(this.succces);
            this.shahrAqaryData.unshift(data);
            this.shahrAqaryData = this.shahrAqaryData.slice();
          } else {
            this.handelErorr.handleErorr(res);
          }
        });
      this.editMode = false;
      this.onResetShahrAqaryFrom();
    } else {
      this.shahrAqaryServ
        .creatStoreShahrAqary(val.ShahrAqaryName)
        .subscribe((res: any) => {
          if (res.statusCode == 200) {
            let data: ShahrAqary = {
              ShahrAqaryName: val.ShahrAqaryName,
              ShahrAqaryID: +res.Data
            };
            this.succces = "Successfully Updated";
            this.showToasterSuccess(this.succces);
            this.shahrAqaryData.unshift(data);
            this.shahrAqaryData = this.shahrAqaryData.slice();
            this.onResetShahrAqaryFrom();
          } else {
            this.handelErorr.handleErorr(res);
          }
        });
    }
  }

  //show category in tabel
  postShahrAqary() {
    this.isLoading = true;

    this.shahrAqaryServ.getShahrAqary().subscribe((shahrAqary: any) => {
      this.shahrAqaryData = shahrAqary.Data;
      this.isLoading = false;
    });
  }

  //clear the form
  onResetShahrAqaryFrom() {
    this.shahrAqaryForm.reset();
    this.editMode = false;
    this.shahrAqaryId = 0;
  }

  //delet
  onDeletMaktb(shahrAqary: ShahrAqary, i) {
    this.shahrAqaryServ.deletShahrAqary(shahrAqary.ShahrAqaryID).subscribe(
      (res: any) => {
        if (res.statusCode == 200) {
          this.shahrAqaryData.splice(i, 1);
          this.shahrAqaryData = this.shahrAqaryData.slice();
          this.onResetShahrAqaryFrom();
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

  shahrAqaryId = 0;
  onUpdateMaktb(shahrAqary: ShahrAqary, i) {
    this.editMode = true;
    this.shahrAqaryForm.setValue({
      ShahrAqaryID: shahrAqary.ShahrAqaryID,
      ShahrAqaryName: shahrAqary.ShahrAqaryName
    });
    this.shahrAqaryId = shahrAqary.ShahrAqaryID;
    this.shahrAqaryData.splice(i, 1);
  }
}
