import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CharityTenderService {

  constructor(private http:HttpClient) { }

   getCharityTenderData() {
    return this.http.get(environment.baseurl + "getNationalCharityTenderData");
  }
  postCharityTenderData(data) {
    return this.http.post(environment.baseurl + "editNationalCharityTenderData", data);
  }


}
