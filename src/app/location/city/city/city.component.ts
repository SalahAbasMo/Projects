import { City } from "./models/city.model";
import { NgForm } from "@angular/forms";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { CityServiceService } from "shared/services/city-service.service";
import { HandleErorrService } from "shared/services/handleErorr.service";

@Component({
  selector: "app-city",
  templateUrl: "./city.component.html",
  styleUrls: ["./city.component.css"]
})
export class CityComponent implements OnInit {
  @ViewChild("cityForm", { static: false })
  cityForm: NgForm;

  //modes
  editMode = false;
  isLoading = false;

  //arrays and tabale array
  public columns: any;
  public rows: City[] = [];
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
    private cityServ: CityServiceService,
    private toastr: ToastrService,
    private handelErorr: HandleErorrService
  ) {
    this.columns = [
      { name: "City Name" },
      { name: "City Code" },
      { name: "Edit" },
      { name: "Delete" }
    ];
  }

  ngOnInit() {
    this.postCity();
  }

  //create city
  onCreatCity(city: NgForm) {
    const val = city.value;
    if (this.editMode) {
      this.cityServ
        .updateCity(this.cityCode, val.CityName, this.comercial)
        .subscribe((res: any) => {
          if (res.statusCode == 200) {
            let data: City = {
              CityName: val.CityName,
              CityCode: res.Data,
              CommercialRegister: val.CommercialRegister
            };
            this.succces = "Successfully Updated";
            this.showToasterSuccess(this.succces);
            this.cityData.unshift(data);
            this.cityData = this.cityData.slice();
          } else {
            this.handelErorr.handleErorr(res);
          }
        });
      this.editMode = false;
      this.onResetCityFrom();
    } else {
      this.cityServ.creatStoreCity(val.CityCode, val.CityName).subscribe(
        (res: any) => {
          if (res.statusCode == 200) {
            let data: City = {
              CityName: val.CityName,
              CityCode: val.CityCode
            };
            this.cityData.unshift(data);
            this.cityData = this.cityData.slice();
            this.succces = "Successfully Added";
            this.showToasterSuccess(this.succces);
            this.onResetCityFrom();
          } else {
            this.handelErorr.handleErorr(res);
          }
        },
        err => {
          let errmsg = "Erorr from server";
          this.showToasterErorr(errmsg);
        }
      );
    }
  }

  //show category in tabel
  postCity() {
    this.isLoading = true;
    this.cityServ.getCites().subscribe(
      (cites: any) => {
        this.cityData = cites.Data;
        this.isLoading = false;
      },
      err => {
        let errmsg = "Erorr from server ";
        this.showToasterErorr(errmsg);
      }
    );
  }

  //clear the form
  onResetCityFrom() {
    this.cityForm.reset();
    this.comercial = 0;
    this.cityCode = 0;
    this.editMode = false;
  }

  //delet city
  onDeletCity(city: City, i) {
    this.cityServ.deletCity(city.CityCode).subscribe(
      (res: any) => {
        if (res.statusCode == 200) {
          this.cityData.splice(i, 1);
          this.cityData = this.cityData.slice();
          this.onResetCityFrom();
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

  comercial = 0;
  cityCode = 0;
  onUpdateCity(city: City, i) {
    this.editMode = true;
    this.cityForm.setValue({
      CityName: city.CityName,
      CityCode: city.CityCode
    });
    this.comercial = city.CommercialRegister;
    this.cityCode = city.CityCode;
    this.cityData.splice(i, 1);
  }
}
