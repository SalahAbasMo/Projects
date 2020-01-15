import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Commercial } from "./models/commercial.model";
import { ToastrService } from "ngx-toastr";
import { CommercialRegServiceService } from "shared/services/commercial-reg-service.service";
import { HandleErorrService } from "shared/services/handleErorr.service";

@Component({
  selector: "app-commercial-register",
  templateUrl: "./commercial-register.component.html",
  styleUrls: ["./commercial-register.component.css"]
})
export class CommercialRegisterComponent implements OnInit {
  @ViewChild("commercialForm", { static: false })
  commercialForm: NgForm;

  //modes
  editMode = false;
  isLoading = false;

  //arrays and tabale array
  public columns: any;
  public rows: Commercial[] = [];
  commData: Commercial[] = [];

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
    private commServ: CommercialRegServiceService,
    private toastr: ToastrService,
    private handelErorr: HandleErorrService
  ) {
    this.columns = [
      { name: "Commercial Name" },
      { name: "Commercial Code" },
      { name: "Edit" },
      { name: "Delete" }
    ];
  }

  ngOnInit() {
    this.postCommercials();
  }

  //create commercial
  onCreatCommercial(commercial: NgForm) {
    const val = commercial.value;

    if (this.editMode) {
      this.commServ
        .updateCommercial(this.comercialId, val.RegisterCommercialName)
        .subscribe((res: any) => {
          if (res.statusCode == 200) {
            let data: Commercial = {
              RegisterCommercialName: val.RegisterCommercialName,
              CommercialRegisterId: +res.Data
            };
            this.succces = "Successfully Updated";
            this.showToasterSuccess(this.succces);
            this.commData.unshift(data);
            this.commData = this.commData.slice();
          } else {
            this.handelErorr.handleErorr(res);
          }
        });
      this.editMode = false;
      this.onResetCommercialFrom();
    } else {
      this.commServ
        .creatStoreCommercial(val.RegisterCommercialName)
        .subscribe((res: any) => {
          if (res.statusCode == 200) {
            let data: Commercial = {
              RegisterCommercialName: val.RegisterCommercialName,
              CommercialRegisterId: +res.Data
            };
            this.commData.unshift(data);
            this.commData = this.commData.slice();
            this.succces = "Successfully Added";
            this.showToasterSuccess(this.succces);
            this.onResetCommercialFrom();
          } else {
            this.handelErorr.handleErorr(res);
          }
        });
    }
  }

  //show category in tabel
  postCommercials() {
    this.isLoading = true;
    this.commServ.getCommercials().subscribe((commercials: any) => {
      this.commData = commercials.Data;
      this.isLoading = false;
    });
  }

  //clear the form
  onResetCommercialFrom() {
    this.commercialForm.reset();
    this.editMode = false;
    this.comercialId = 0;
  }

  //delete
  onDeletCommercial(commercial: Commercial, i) {
    this.commServ.deletCommercial(commercial.CommercialRegisterId).subscribe(
      (res: any) => {
        if (res.statusCode == 200) {
          this.commData.splice(i, 1);
          this.commData = this.commData.slice();
          this.onResetCommercialFrom();
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

  comercialId = 0;
  onUpdateCommercial(commercial: Commercial, i) {
    this.editMode = true;
    this.commercialForm.setValue({
      CommercialRegisterId: commercial.CommercialRegisterId,
      RegisterCommercialName: commercial.RegisterCommercialName
    });
    this.comercialId = commercial.CommercialRegisterId;
    this.commData.splice(i, 1);
  }
}
