import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { catchError, tap, mapTo, map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
const apiUrl = environment.apiUrl +"/api/";
@Injectable({
  providedIn: 'root'
})


export class AuthService {

 
  // isLoggedIn = false;
  logged=new Subject<boolean>()
  user = new Subject<any>();

  loggedIn= false;

  
  constructor(
     public cookieService: CookieService,
    private http: HttpClient,
    private router: Router,public auth: AngularFireAuth) { }


    setLoggedIn(t:boolean){
      this.loggedIn=t;
    }



  login(email:string,password:string)  {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true, //this is required so that Angular returns the Cookies received from the server. The server sends cookies in Set-Cookie header. Without this, Angular will ignore the Set-Cookie header
      observe: 'response' as 'response'
    };
    
    return this.http.post(apiUrl+'users/login', {username : email,password : password})
 
  }


  signUp(email:string,password:string,passwordConfirm:string,name:string,phoneNumber:string)  {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true, //this is required so that Angular returns the Cookies received from the server. The server sends cookies in Set-Cookie header. Without this, Angular will ignore the Set-Cookie header
      observe: 'response' as 'response'
    };
    return this.http.post(apiUrl+'users/register', {name:name,username : email,password : password,passwordConfirm:passwordConfirm,phoneNumber:phoneNumber}) 
  }


  logout() {
    this.cookieService.delete("user_data")
    this.cookieService.delete('access_token');

  }

  getCurrentUser() {
   
    return this.cookieService.get('user_data');
  }

  getAccessToken() {

     return this.cookieService.get('access_token');
  }



  isLoggedIn():boolean {
    const currentUser = this.getCurrentUser();
    
    if (currentUser) {
      const token = this.getAccessToken();
      if (token) {
        return true;
      } else {
        this.logout();
      }
    }
    return false;
  }

  doLogin(user: any,s:any) {
    this.cookieService.set('user_data',user);
    this.cookieService.set('access_token',s);

  }

  

}
