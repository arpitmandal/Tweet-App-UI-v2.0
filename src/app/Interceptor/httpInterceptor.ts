import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class httpInterceptor implements HttpInterceptor {
 intercept(request: HttpRequest<any>, newRequest: HttpHandler): Observable<HttpEvent<any>> {
 // add authorization header to request
 let tokenInfoString = localStorage.getItem('TokenInfo');
 let tokenInfo;
 
 if (tokenInfoString) {
   tokenInfo = JSON.parse(tokenInfoString);
 }
 
 if (tokenInfo && tokenInfo.token) {
   request = request.clone({
     setHeaders: {
       Authorization: `Bearer ${tokenInfo.token}`,
       'Content-Type': 'application/json;charset=utf-8'
     }
   });
 }
 

 return newRequest.handle(request);
 }
}