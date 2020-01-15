import { IncorpAct } from "./model/incop-act.model";
import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { IncorporationActService } from "shared/services/incorporation-act.service";
import { HandleErorrService } from "shared/services/handleErorr.service";

@Component({
  selector: "app-incorporation-act",
  templateUrl: "./incorporation-act.component.html",
  styleUrls: ["./incorporation-act.component.css"]
})
export class IncorporationActComponent implements OnInit {
  @ViewChild("incorpForm", { static: false })
  incorpForm: NgForm;

  //modes
  editMode = false;
  isLoading = false;

  //arrays and tabale array
  public columns: any;
  public rows: IncorpAct[] = [];
  incorpData: IncorpAct[] = [];

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
    private incorpServ: IncorporationActService,
    private toastr: ToastrService,
    private handelErorr: HandleErorrService
  ) {
    this.columns = [
      { name: "Incorp-Act Name" },
      { name: "Incorp-Act Code" },
      { name: "Edit" },
      { name: "Delete" }
    ];
  }

  ngOnInit() {
    this.postIncorp();
  }

  //create
  onCreatIncorp(incorp: NgForm) {
    const val = incorp.value;

    if (this.editMode) {
      this.incorpServ
        .updateIncorp(this.incorpId, val.IncorporationActName)
        .subscribe((res: any) => {
          if (res.statusCode == 200) {
            let data: IncorpAct = {
              IncorporationActName: val.IncorporationActName,
              IncorporationActId: +res.Data
            };
            this.succces = "Successfully Updated";
            this.showToasterSuccess(this.succces);
            this.incorpData.unshift(data);
            this.incorpData = this.incorpData.slice();
          } else {
            this.handelErorr.handleErorr(res);
          }
        });
      this.editMode = false;
      this.onResetIncorpFrom();
    } else {
      this.incorpServ
        .creatStoreIncorp(val.IncorporationActName)
        .subscribe((res: any) => {
          if (res.statusCode == 200) {
            console.log(res);
            let data: IncorpAct = {
              IncorporationActName: val.IncorporationActName,
              IncorporationActId: +res.Data
            };
            this.incorpData.unshift(data);
            this.incorpData = this.incorpData.slice();
            this.succces = "Successfully Added";
            this.showToasterSuccess(this.succces);
            this.onResetIncorpFrom();
          } else {
            this.handelErorr.handleErorr(res);
          }
        });
    }
  }

  //show category in tabel
  postIncorp() {
    this.isLoading = true;
    this.incorpServ.getIncorp().subscribe((incorp: any) => {
      this.incorpData = incorp.Data;
      this.isLoading = false;
    });
  }

  //clear the form
  onResetIncorpFrom() {
    this.incorpForm.reset();
    this.incorpId = 0;
    this.editMode = false;
  }

  //delet incorpData
  onDeletIncorp(incorp: IncorpAct, i) {
    this.incorpServ.deletIncorp(incorp.IncorporationActId).subscribe(
      (res: any) => {
        if (res.statusCode == 200) {
          this.incorpData.splice(i, 1);
          this.incorpData = this.incorpData.slice();
          this.onResetIncorpFrom();
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

  incorpId = 0;
  onUpdateincorp(incorp: IncorpAct, i) {
    this.editMode = true;
    this.incorpForm.setValue({
      IncorpID: incorp.IncorporationActId,
      IncorporationActName: incorp.IncorporationActName
    });
    this.incorpId = incorp.IncorporationActId;
    this.incorpData.splice(i, 1);
  }
}
