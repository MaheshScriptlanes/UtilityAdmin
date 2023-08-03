import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {  ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../sharedApi/login.service';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs/Observable'
import { SnackbarService } from '../sharedApi/snackbar.service';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder ,private route:Router,private apiSer:LoginService,private cookieSer:CookieService,private snackbar:SnackbarService) { }

  ngOnInit(): void {
  }
  responseMessage:any;
  loginForm=this.fb.group({
    username:['',Validators.required],
    password:['',Validators.required]
  })
  onSubmit(){
    // this.apiSer.getData("login",{
    //   username:this.loginForm.value.username,
    //   password:this.loginForm.value.password
    // }).subscribe((res:any=>){

    // })
    this.apiSer.getData("login",this.loginForm.value).subscribe((res:any)=>{
      // let myHeader = res.headers.get('session');
      // console.log("data from header",myHeader)
      
      console.log("data in res",this.cookieSer.get('session'));
      
      if(res.status=="success"){
        // this.cookieSer.set('session','hello everyone',)
        localStorage.setItem('username','admin')
        this.snackbar.showMessage("Logged In Successfully",'Undo')
        this.route.navigate(['dashboard/casestudy'])
      }
      else{
        this.snackbar.showMessage("Please enter the correct username and password. Note that both fields may be case-sensitive.",'Undo')
      }
    })
    
  }
}
