import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EcardUserService {

  constructor(private http: HttpClient) { }
  //E card users
  getEcardUserData() {
    return this.http.get(environment.baseurl + "getEcardUserData");
  }

  uploadImages(path: any, data: any, option) {
    return this.http.post(environment.baseurl + path, data, option);
  }

  addEcardUserData(data) {
    return this.http.post(environment.baseurl + "addNewUserForECard", data);
  }

  editEcardUserData(data) {
    return this.http.post(environment.baseurl + "editUserForECard",  data);
  }

  getEcardUserDataById(data) {
    return this.http.post(environment.baseurl + "getEcardUserDataById", data);
  }

  deleteEcardUserData(data) {
    return this.http.post(environment.baseurl + "deleteUserForECard",  data);
  }

}
