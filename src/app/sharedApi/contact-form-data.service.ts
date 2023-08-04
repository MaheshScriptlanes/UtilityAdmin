import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactFormDataService {

  constructor(private http:HttpClient) { }

  getContactFormData(data) {
   return this.http.post(environment.baseurl + "getdata", data);
 }
}
