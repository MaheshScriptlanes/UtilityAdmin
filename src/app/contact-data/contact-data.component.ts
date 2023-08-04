import { Component, OnInit } from '@angular/core';
import { ContactDataService } from '../sharedApi/contact-data.service';

@Component({
  selector: 'app-contact-data',
  templateUrl: './contact-data.component.html',
  styleUrls: ['./contact-data.component.scss']
})
export class ContactDataComponent implements OnInit {

  contactDataObj: any;
  constructor(private contactDataService: ContactDataService) { }
  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.contactDataService.getContactData({}).subscribe((res: any) => {
      this.contactDataObj = res;
      console.log("Contact DATA", this.contactDataObj);
    })
  }
}
