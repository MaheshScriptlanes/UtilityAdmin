import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestiMonialsService {

  constructor(private http:HttpClient) { }
  showData(path:any,data){
    return this.http.post(environment.baseurl+path,data);
  }
}
