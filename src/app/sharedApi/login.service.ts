import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from 'src/environments/environment'
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient,private cookieSer:CookieService) { }
  isLogged=true;
  getData(path:any,data){
    
    return this.http.post(environment.baseurl+path,data)
  }
  // isloggedIn(){
  //   this.isLogged=true;
  // }
}
