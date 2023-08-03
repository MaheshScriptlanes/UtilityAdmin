import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsSerService {

  constructor(private htpp:HttpClient) { }
  postData(path:any,data){
    return this.htpp.post(environment.baseurl+path,data);
  
  }
  getData(path:any){
    return this.htpp.get(environment.baseurl+path);
  }
  uploadImages(path:any,data:any,option){
    return this.htpp.post(environment.baseurl+path,data,option);
  }
}
