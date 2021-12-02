import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signup.component.html',
  styleUrls: ['./signin.component.css']
})
export class SignupComponent implements OnInit {

  form = new FormGroup({

    password : new FormControl('', [Validators.required, Validators.minLength(6)]), 
    username: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    passwordConfirm: new FormControl('', Validators.minLength(6)),
 
 
   });
  constructor(public cookieService: CookieService,public auth : AuthService,public router :Router) { }

  ngOnInit(): void {
  }

  get f(){
   
    return this.form.controls;

  }

  async onSignup(){
    if (this.f.password.errors) {
    
    } else {
  
  
      const username= this.form.get('username')!.value;
      const name= this.form.get('name')!.value;
      const phoneNumber= this.form.get('phoneNumber')!.value;
      const passwordConfirm= this.form.get('passwordConfirm')!.value;
  
      const password= this.form.get('password')!.value
      this.auth.signUp(username,password,passwordConfirm,name,phoneNumber).subscribe((res:any)=>{
       
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
