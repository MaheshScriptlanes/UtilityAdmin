import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WhyUaService {

  constructor(private http:HttpClient) { }
  getData(path:any){
  return  this.http.get(environment.baseurl+path) 
  }
postData(path:any,data){
return this.http.post(environment.baseurl+path,data); 
}

}
