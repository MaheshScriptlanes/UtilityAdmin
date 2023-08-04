import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OurServicesService {

  constructor(private http: HttpClient) { }

  // Invoice Validation
  getInvoiceValidationData() {
    return this.http.get(environment.baseurl + "getInvoiceValidationPageData");
  }
  postInvoiceValidationData(data) {
    return this.http.post(environment.baseurl + "editInvoiceValidationPageData", data);
  }

  // Net Zero and Carbon Reporting
  getZeroAndCarbonData() {
    return this.http.get(environment.baseurl + "getNetZeroPageData");
  }
  postZeroAndCarbonData(data) {
    return this.http.post(environment.baseurl + "editNetZeroPageData", data);
  }

  // Void management

  getVoidManagementData() {
    return this.http.get(environment.baseurl + "getVoidManagementServicePageData");
  }
  postVoidManagementData(data) {
    return this.http.post(environment.baseurl + "editVoidManagementServicePageData", data);
  }

  //Customer Care
  getCustomerCareData() {
    return this.http.get(environment.baseurl + "getCustomerCarePageData");
  }
  postCustomerCareData(data) {
    return this.http.post(environment.baseurl + "editCustomerCarePageData", data);
  }

  //Account Management
  getAccountManagementData() {
    return this.http.get(environment.baseurl + "getAccountManagementPageData");
  }
  postAccountManagementData(data) {
    return this.http.post(environment.baseurl + "editAccountManagementPageData", data);
  }

  //Energy Procurement
  getEnergyProcurementData(data) {
    return this.http.post(environment.baseurl + "getProductList", data);
  }
  postEnergyProcurementData(data) {
    return this.http.post(environment.baseurl + "updateProductData", data);
  }

}
