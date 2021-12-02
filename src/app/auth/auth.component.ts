import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
email:string ="";
password:string ="";
name:string ="";
  constructor(public auth : AuthService) { }

  ngOnInit(): void {
  }


  async onSignup(name:string,email:string,password:string){
    await this.auth.login(email,password)
    // if(this.auth.isLoggedIn)
    // this.isSignedIn = true
  }

  async onSignin(email:string,password:string){
    await this.auth.login(email,password)
    //if(this.auth.isLoggedIn)
  //  this.isSignedIn = true
  }

  // handleLogout(){
  //   this.isSignedIn = false

  // }

}
