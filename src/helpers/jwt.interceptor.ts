import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const user = this.authService.userValue;
        const isLoggedIn = user?.token;
        const isApiUrl = request.url.startsWith('http://localhost:4001/auth');
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    user_token: ` ${user.token}`
                }
            });
        }

        return next.handle(request);
    }
}