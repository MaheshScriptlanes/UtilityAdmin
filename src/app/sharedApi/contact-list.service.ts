import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactListService {

  constructor(private htpp:HttpClient) { }
showData(path:any,data){
return this.htpp.post(environment.baseurl+path,data);
}
}
