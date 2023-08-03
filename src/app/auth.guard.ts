import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './sharedApi/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private loginservice:LoginService,private route:Router){}
  canActivate():boolean
   
   {
    if(localStorage.getItem('username')!=null)
    {
      return true;
    }
    else{
      return false;
    }
   
  }
  
}
