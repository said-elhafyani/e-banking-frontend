import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private authService : AuthService) {}

  // This method is called before any HTTP request is sent. It is used to add the access token to the request headers.
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log(this.authService.isAutheticated)
    if (!request.url.includes('/auth/login')) {

      console.log(this.authService.accessToken);
      let requestWithToken = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + this.authService.accessToken)
      });
      console.log('Sending request with new header now ...'+ requestWithToken.url);
      return next.handle(requestWithToken).pipe(
        catchError(err=>{
          if(err.status == 401)// unauthorized
          this.authService.logout();
          return throwError(err.message);
        })
      );
    }
    else {
      return next.handle(request);
    }
  }


}

// pour utiliser l'intercepteur, il faut le déclarer dans le tableau providers du module racine de l'application.
