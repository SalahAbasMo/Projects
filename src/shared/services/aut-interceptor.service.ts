import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AutInterceptorService implements HttpInterceptor {
	constructor(private autServ: AuthService) {}
	intercept(req: HttpRequest<any>, next: HttpHandler) {
		return this.autServ.user.pipe(
			take(1),
			exhaustMap((user) => {
				if (!user) {
					return next.handle(req);
				}
				const modifedReq = req.clone({ params: new HttpParams().set('auth', user.Token) });
				return next.handle(modifedReq);
			})
		);
	}
}
