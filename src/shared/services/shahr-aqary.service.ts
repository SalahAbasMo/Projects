import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TokenService } from "./token.service";
import { map } from "rxjs/operators";
import { ShahrAqary } from "app/location/shahr-aqary/model/shahr-aqary.model";

@Injectable({
  providedIn: "root"
})
export class ShahrAqaryService {
  constructor(private http: HttpClient, private token: TokenService) {}
  url = "http://10.0.0.35:9999/api/";

  //Commercial
  creatStoreShahrAqary(ShahrAqaryName: string) {
    const shahrAqaryData: ShahrAqary = {
      ShahrAqaryName: ShahrAqaryName
    };
    return this.http.post(
      this.url + "ShahrAqary/add",
      shahrAqaryData,
      this.token.getHeaders
    );
  }

  getShahrAqary() {
    return this.http.get(this.url + "ShahrAqary/list", this.token.getHeaders);
  }
  updateShahrAqary(ShahrAqaryID: number, ShahrAqaryName: string) {
    const shahrAqaryData: ShahrAqary = {
      ShahrAqaryID: ShahrAqaryID,
      ShahrAqaryName: ShahrAqaryName
    };
    return this.http.post(
      this.url + "ShahrAqary/edit",
      shahrAqaryData,
      this.token.getHeaders
    );
  }

  deletShahrAqary(shahrAqaryID) {
    return this.http.post(
      this.url + "ShahrAqary/Delete?shahrAqaryId=" + shahrAqaryID,
      "",
      this.token.getHeaders
    );
  }
}
