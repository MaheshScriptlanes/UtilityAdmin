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
}
