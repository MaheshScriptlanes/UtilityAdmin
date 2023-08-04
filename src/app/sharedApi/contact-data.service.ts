import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactDataService {

  constructor(private http:HttpClient) { }

  getContactData(data) {
   return this.http.post(environment.baseurl + "getContactFormData", data);
 }

}
