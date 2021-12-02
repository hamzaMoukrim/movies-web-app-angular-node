import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {

//  loginForm: FormGroup;
 //  @ViewChild('f') loginForm :NgForm;

   form = new FormGroup({

   password : new FormControl('', [Validators.required, Validators.minLength(6)]),

   username: new FormControl('', [Validators.required]),

   


  });

  
  constructor(     public cookieService: CookieService,public auth : AuthService,public router :Router) { }

  ngOnInit(): void {
  
  }
  get f(){
   
    return this.form.controls;

  }


  ngOnDestroy():void{
   
  }

  async onSignin(){

  //  console.log(this.form.value)

  if (this.f.password.errors) {
    
  } else {


    const username= this.form.get('username')!.value;

    const password= this.form.get('password')!.value
    this.auth.login(username,password).subscribe((res:any)=>{
     
      if (!res.status) {
     
        
          Swal.fire({
            title: 'Error!',
            text: res.errors,
            icon: 'error',
            confirmButtonText: 'Cool'
          })
      }else{
      this.auth.setLoggedIn(true)
      this.auth.doLogin(res.user,res.accessToken)
      this.router.navigate([""])
      }
    })


  }
  



  }

}
