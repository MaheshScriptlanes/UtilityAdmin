import { Component, OnInit } from '@angular/core';
import { ContactFormDataService } from '../sharedApi/contact-form-data.service';
import { PaginationService } from '../sharedApi/pagination.service';

@Component({
  selector: 'app-contact-form-data',
  templateUrl: './contact-form-data.component.html',
  styleUrls: ['./contact-form-data.component.scss']
})
export class ContactFormDataComponent implements OnInit {

  contactFormDataObj: any;
  pager: any = {};
  pagedItems: any[];

  constructor(private contactFormDataService: ContactFormDataService, private pagination: PaginationService) { }
  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.contactFormDataService.getContactFormData({}).subscribe((res: any) => {
      this.contactFormDataObj = res;
      this.contactFormDataObj.sort((a, b) => parseFloat(b.updatedDate) - parseFloat(a.updatedDate));
      this.setPage(1);
      console.log("Contact Form DATA", this.contactFormDataObj);
    })

  }

  setPage(page: number) {
    this.pager = this.pagination.getPager(this.contactFormDataObj.length, page);
    this.pagedItems = this.contactFormDataObj.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
