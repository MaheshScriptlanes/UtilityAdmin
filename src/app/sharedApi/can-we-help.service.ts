import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CanWeHelpService {

  constructor(private http: HttpClient) { }

  getCanweHelpData() {
    return this.http.get(environment.baseurl + "getCanweHelpData");
  }

  // addCanweHelpData(data) {
  //   return this.http.post(environment.baseurl + "addCanweHelpData", data);
  // }

  editCanweHelpData(data) {
    return this.http.post(environment.baseurl + "editCanweHelpData", data);
  }

}
