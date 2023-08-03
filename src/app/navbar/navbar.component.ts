import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SnackbarService } from '../sharedApi/snackbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private route:Router,private coockie:CookieService, private snackbar:SnackbarService) { }

  ngOnInit(): void {
  }
  logOut(){
    // localStorage.clear();
    // localStorage.setItem('username','false');    
    localStorage.removeItem('username');
    this.snackbar.showMessage("Succesfully Log Out",'Undo')
    this.route.navigate(['']);
    
  }
}
