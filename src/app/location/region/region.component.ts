import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Region } from "./model/region.model";
import { ToastrService } from "ngx-toastr";
import { City } from "../city/city/models/city.model";
import { map } from "rxjs/operators";
import { RegionService } from "shared/services/region.service";
import { CityServiceService } from "shared/services/city-service.service";
import { HandleErorrService } from "shared/services/handleErorr.service";

@Component({
  selector: "app-region",
  templateUrl: "./region.component.html",
  styleUrls: ["./region.component.css"]
})
export class RegionComponent implements OnInit {
  @ViewChild("regionForm", { static: false })
  regionForm: NgForm;

  //modes
  editMode = false;
  isLoading = false;

  //arrays and tabale array
  public columns: any;
  public rows: Region[] = [];
  regionData: Region[] = [];
  cityData: City[] = [];

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
    private regionServ: RegionService,
    private cityServ: CityServiceService,
    private toastr: ToastrService,
    private handelErorr: HandleErorrService
  ) {
    this.columns = [
      { name: "Region Name" },
      { name: "Region Code" },
      { name: "Edit" },
      { name: "Delete" }
    ];
  }

  ngOnInit() {
    this.postCity();
    this.postRegion();
  }

  //create
  onCreatRegion(region: NgForm) {
    const val = region.value;

    if (this.editMode) {
      this.regionServ
        .updateRegion(this.regionCode, val.RegionName, val.Bandar, val.CityCode)
        .subscribe((res: any) => {
          if (res.statusCode == 200) {
            let data: Region = {
              RegionCode: res.Data,
              RegionName: val.RegionName,
              Bandar: val.Bandar,
              CityCode: val.CityCode
            };
            this.succces = "Successfully Updated";
            this.showToasterSuccess(this.succces);
            this.regionData.unshift(data);
            this.regionData = this.regionData.slice();
          } else {
            this.handelErorr.handleErorr(res);
          }
        });
      this.editMode = false;
      this.onResetRegionFrom();
    } else {
      this.regionServ
        .creatStoreRegion(
          val.RegionCode,
          val.RegionName,
          val.Bandar,
          val.CityCode
        )
        .subscribe((res: any) => {
          if (res.statusCode == 200) {
            let data: Region = {
              RegionCode: val.RegionCode,
              RegionName: val.RegionName,
              Bandar: val.Bandar,
              CityCode: val.CityCode
            };
            this.succces = "Successfully Updated";
            this.showToasterSuccess(this.succces);
            this.regionData.unshift(data);
            this.regionData = this.regionData.slice();
            this.onResetRegionFrom();
          } else {
            this.handelErorr.handleErorr(res);
          }
        });
    }
  }

  //show category in tabel
  postRegion() {
    this.isLoading = true;
    this.regionServ.getRegion().subscribe((region: any) => {
      this.regionData = region.Data;
      this.isLoading = false;
    });
  }

  postCity() {
    this.isLoading = true;
    this.cityServ.getCites().subscribe((cites: any) => {
      this.cityData = cites.Data;
      this.isLoading = false;
    });
  }

  //clear the form
  onResetRegionFrom() {
    this.regionForm.reset();
    this.editMode = false;
  }

  //delete
  onDeletRegion(region: Region, i) {
    this.regionServ.deletRegion(region.RegionCode).subscribe(
      (res: any) => {
        if (res.statusCode == 200) {
          this.regionData.splice(i, 1);
          this.regionData = this.regionData.slice();
          this.onResetRegionFrom();
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

  regionCode = 0;
  onUpdateRegion(region: Region, i) {
    this.editMode = true;
    this.regionForm.setValue({
      RegionName: region.RegionName,
      RegionCode: region.RegionCode,
      Bandar: region.Bandar,
      CityCode: region.CityCode
    });
    this.regionCode = region.RegionCode;
    this.regionData.splice(i, 1);
  }
}
