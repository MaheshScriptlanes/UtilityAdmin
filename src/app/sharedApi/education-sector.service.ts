import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EducationSectorService {

  constructor(private http:HttpClient) { }

  //Education Sector
  getEducationSectorData() {
    return this.http.get(environment.baseurl + "getEducationSectorData");
  }
  postEducationSectorData(data) {
    return this.http.post(environment.baseurl + "editEducationSectorData", data);
  }

  //Our Customers
  getOurCustomerData() {
    return this.http.get(environment.baseurl + "getReviewPageData");
  }

  getSingleOurCustomerData(data) {
    return this.http.post(environment.baseurl + "getSingleReviewPageData", data);
  }

  addOurCustomerData(data) {
    return this.http.post(environment.baseurl + "addReviewPageData", data);
  }

  editOurCustomerData(data) {
    return this.http.post(environment.baseurl + "editReviewPageData", data);
  }

}
