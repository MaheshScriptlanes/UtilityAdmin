import { Component, OnInit } from '@angular/core';
import { SnackbarService } from '../sharedApi/snackbar.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private snackbar:SnackbarService,private cookie:CookieService,private route:Router) { }

  ngOnInit(): void {
  }
  logOut(){
    this.cookie.deleteAll();
    this.snackbar.showMessage("Succesfully Log Out",'Undo')
    this.route.navigate(['']);
  }
}
