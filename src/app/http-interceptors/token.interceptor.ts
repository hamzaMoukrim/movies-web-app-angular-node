import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let httpOptions = {

     
      headers: new HttpHeaders({ 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*',
      "Access-Control-Allow-Methods": "*",   "Access-Control-Allow-Headers": "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'" }),
      withCredentials: true 
    };

    const token = this.authService.getAccessToken();

    if (this.authService.isLoggedIn()) {
    
      request = request.clone({setHeaders: { Authorization: `${token}` }});
    }
    return next.handle(request);
  }

}