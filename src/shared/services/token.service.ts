import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class TokenService {
  constructor() {}

  token =
    "basic MTE4fHx8MTEzOjo6YWRtaW46OjoxMDh8fHwxLzE1LzIwMjAgMToxMjoyMiBBTXx8fDQvMjMvMjAyMCAxOjEyOjIyIEFNfHx8MjF8fHwxLzE1LzIwMjAgNToxMjoyMiBBTXx8fDE2Nnx8fDE4MHx8fG0hbm1AeA==";
  get getHeaders() {
    return {
      headers: {
        authorization: this.token
      }
    };
  }
}
