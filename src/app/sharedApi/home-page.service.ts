import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomePageService {

  constructor(private http:HttpClient) { }

  showData(data){
    return this.http.post(environment.baseurl+"getProductList", data);
  }
  postData(data){
    return this.http.post(environment.baseurl+"updateProductData", data);
  }

}
