import { TokenService } from "./token.service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { City } from "app/location/city/city/models/city.model";

@Injectable({
  providedIn: "root"
})
export class CityServiceService {
  constructor(private http: HttpClient, private token: TokenService) {}
  url = "http://10.0.0.35:9999/api/";
  //Category
  creatStoreCity(CityCode: number, CityName: string) {
    const cityData: City = { CityCode: CityCode, CityName: CityName };
    return this.http.post(
      this.url + "city/add",
      cityData,
      this.token.getHeaders
    );
  }

  getCites() {
    return this.http.get(this.url + "city/list", this.token.getHeaders);
  }
  updateCity(CityCode: number, CityName: string, CommercialRegister: number) {
    const cityData: City = {
      CityCode: CityCode,
      CityName: CityName,
      CommercialRegister: CommercialRegister
    };
    return this.http.post(
      this.url + "city/edit",
      cityData,
      this.token.getHeaders
    );
  }

  deletCity(cityCode) {
    return this.http.post(
      this.url + "city/delete?cityCode=" + cityCode,
      "",
      this.token.getHeaders
    );
  }

  searchCity(cityCode) {
    return this.http.get(
      this.url + "city/GetByCode?cityCode=" + cityCode,
      this.token.getHeaders
    );
  }
}
