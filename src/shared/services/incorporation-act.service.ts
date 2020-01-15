import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TokenService } from "./token.service";
import { map } from "rxjs/operators";
import { IncorpAct } from "app/features/incorporation-act/model/incop-act.model";

@Injectable({
  providedIn: "root"
})
export class IncorporationActService {
  constructor(private http: HttpClient, private token: TokenService) {}
  url = "http://10.0.0.35:9999/api/";

  //Commercial
  creatStoreIncorp(IncorporationActName: string) {
    const incorpData: IncorpAct = {
      IncorporationActName: IncorporationActName
    };
    return this.http.post(
      this.url + "IncorporationAct/AddIncorporationAct",
      incorpData,
      this.token.getHeaders
    );
  }

  getIncorp() {
    return this.http.get(
      this.url + "IncorporationAct/GetIncorporationAct",
      this.token.getHeaders
    );
  }
  updateIncorp(IncorporationActId: number, IncorporationActName: string) {
    const incorpData: IncorpAct = {
      IncorporationActId: IncorporationActId,
      IncorporationActName: IncorporationActName
    };
    return this.http.post(
      this.url + "IncorporationAct/EditIncorporationAct",
      incorpData,
      this.token.getHeaders
    );
  }

  deletIncorp(IncorporationActId) {
    return this.http.post(
      this.url +
        "IncorporationAct/DeleteIncorporationAct?incorporationActId=" +
        IncorporationActId,
      "",
      this.token.getHeaders
    );
  }
}
