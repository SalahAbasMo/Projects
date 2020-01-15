import { TokenService } from "./token.service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Commercial } from "app/location/comercial-register/commercial-register/models/commercial.model";

@Injectable({
  providedIn: "root"
})
export class CommercialRegServiceService {
  constructor(private http: HttpClient, private token: TokenService) {}
  url = "http://10.0.0.35:9999/api/";

  //Commercial
  creatStoreCommercial(RegisterCommercialName: string) {
    const ciommercialData: Commercial = {
      RegisterCommercialName: RegisterCommercialName
    };
    return this.http.post(
      this.url + "ComericalReg/add",
      ciommercialData,
      this.token.getHeaders
    );
  }

  getCommercials() {
    return this.http.get(this.url + "ComericalReg/list", this.token.getHeaders);
  }
  updateCommercial(
    CommercialRegisterId: number,
    RegisterCommercialName: string
  ) {
    const commData: Commercial = {
      CommercialRegisterId: CommercialRegisterId,
      RegisterCommercialName: RegisterCommercialName
    };
    return this.http.post(
      this.url + "ComericalReg/edit",
      commData,
      this.token.getHeaders
    );
  }

  deletCommercial(commercialId) {
    return this.http.post(
      this.url + "ComericalReg/delete?comericalRegId=" + commercialId,
      "",
      this.token.getHeaders
    );
  }
}
