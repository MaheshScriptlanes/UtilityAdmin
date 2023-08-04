import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdvisoryService {

  constructor(private http:HttpClient) { }
  postData(path:any,data){
    return this.http.post(environment.baseurl+path,data);
  }
  getData(path:any){
    return this.http.get(environment.baseurl+path);
  }

  //Our Heritage
  getOurHeritageData() {
    return this.http.get(environment.baseurl + "getOurHeritagePageData");
  }
  postOurHeritageData(data) {
    return this.http.post(environment.baseurl + "editOurHeritagePageData", data);
  }

  //Our Team
  getOurTeamPageData() {
    return this.http.get(environment.baseurl + "getOurTeamPageData");
  }

  getSingleOurTeamPageData(data) {
    return this.http.post(environment.baseurl + "getSingleOurTeamPageData", data);
  }

  uploadImages(path:any,data:any,option){
    return this.http.post(environment.baseurl+path,data,option);
  }

  addOurTeamPageData(data) {
    return this.http.post(environment.baseurl + "addOurTeamPageData", data);
  }

  editOurTeamPageData(data) {
    return this.http.post(environment.baseurl + "editOurTeamPageData", data);
  }

}
