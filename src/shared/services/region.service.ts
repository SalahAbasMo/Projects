import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { TokenService } from "./token.service";
import { Region } from "app/location/region/model/region.model";

@Injectable({
  providedIn: "root"
})
export class RegionService {
  constructor(private http: HttpClient, private token: TokenService) {}
  url = "http://10.0.0.35:9999/api/";

  //Commercial
  creatStoreRegion(
    RegionCode: number,
    RegionName: string,
    Bandar: boolean,
    CityCode: number
  ) {
    const regionData: Region = {
      RegionCode: RegionCode,
      RegionName: RegionName,
      Bandar: Bandar,
      CityCode: CityCode
    };
    return this.http.post(
      this.url + "Region/add",
      regionData,
      this.token.getHeaders
    );
  }

  getRegion() {
    return this.http.get(this.url + "Region/list", this.token.getHeaders);
  }
  updateRegion(
    RegionCode: number,
    RegionName: string,
    Bandar: boolean,
    CityCode: number
  ) {
    const regionData: Region = {
      RegionCode: RegionCode,
      RegionName: RegionName,
      Bandar: Bandar,
      CityCode: CityCode
    };
    return this.http.post(
      this.url + "Region/edit",
      regionData,
      this.token.getHeaders
    );
  }

  deletRegion(regionID) {
    return this.http.post(
      this.url + "Region/Delete?regionCode=" + regionID,
      "",
      this.token.getHeaders
    );
  }
}
