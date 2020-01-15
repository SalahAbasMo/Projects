export class User {
	constructor(public UserName: string, public Id: number, public Token: string, public IsLogin: boolean) {}

	get getHeaders() {
		return {
			headers: {
				authorization: this.Token
			}
		};
	}
}
