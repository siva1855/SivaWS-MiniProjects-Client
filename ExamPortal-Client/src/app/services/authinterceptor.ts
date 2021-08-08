import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";



@Injectable()
export class Authinterceptor implements HttpInterceptor {

    constructor(private login: LoginService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        //add the JWT Token (localStorage) request
        let authReq = req;
        const token = this.login.getToken();
        console.log('inside interceptor...');
        if (token != null) {
            authReq = authReq.clone({
                setHeaders: { Authorization: `Bearer ${token}` },
            });
           
        }
        return next.handle(authReq);
    }
}

export const authinterceptorProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: Authinterceptor,
        multi: true
    }
];
