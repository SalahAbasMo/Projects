import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TokenService } from "./token.service";
import { map } from "rxjs/operators";
import { Governate } from "app/location/governate/model/governate.model";

@Injectable({
  providedIn: "root"
})
export class GovernateService {
  constructor(private http: HttpClient, private token: TokenService) {}
  url = "http://10.0.0.35:9999/api/";

  //Commercial
  creatStoreGovernate(GovernorateName: string) {
    const governateData: Governate = {
      GovernorateName: GovernorateName
    };
    return this.http.post(
      this.url + "Governate/add",
      governateData,
      this.token.getHeaders
    );
  }

  getGovernate() {
    return this.http.get(this.url + "Governate/list", this.token.getHeaders);
  }
  updateGovernate(GovernorateID: number, GovernorateName: string) {
    const governateData: Governate = {
      GovernorateID: GovernorateID,
      GovernorateName: GovernorateName
    };
    return this.http.post(
      this.url + "Governate/edit",
      governateData,
      this.token.getHeaders
    );
  }

  deletGovernate(governateId) {
    return this.http.post(
      this.url + "Governate/Delete?governorateId=" + governateId,
      "",
      this.token.getHeaders
    );
  }
}
