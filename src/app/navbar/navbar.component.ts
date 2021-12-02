import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userInput="";
  isLoggedIn=false
  loggedSubscribe :Subscription=new Subscription()
  constructor(private router: Router,public auth : AuthService) { }

  ngOnInit(): void {

    

       this.isLoggedIn=this.auth.isLoggedIn();
 
  }
  onSearch(s:any) {
  //  this.auth.isLoggedIn
    this.router.navigate(['/search'],{queryParams:{input:s}});
};


logout(){
  this.auth.logout()
}

onChangeSearchText(){
  if(this.userInput!=""){
    return this.onSearch(this.userInput)
  }

}

}
