import { Component, OnInit } from '@angular/core';
import { ContactListService } from '../sharedApi/contact-list.service';
import { Router } from '@angular/router';
import { PaginationService } from '../sharedApi/pagination.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  constructor(private apiSer:ContactListService,private route:Router,private paginator:PaginationService) { }
  searchText:any;
  pager: any = {};
  pagedItems: any[];
  ngOnInit(): void {
  this.getData();
  }
  contactListObject:any;

getData(){
  let data={
    collection:"contact"
  }
  this.apiSer.showData("getProductList",data).subscribe((res:any)=>{
    this.contactListObject=res;
    // this.setPage(1);
    this.contactListObject.sort((a, b) => parseFloat(b.updatedDate) - parseFloat(a.updatedDate));
  })
}
edit(obj){
this.route.navigate(['dashboard/editContact'],{ queryParams:{ objectId:obj._id} })
}
// setPage(page: number) {
//   this.pager = this.paginator.getPager( this.contactListObject.length, page);
//   console.log("value of pager",this.pager)
//   this.pagedItems = this.contactListObject.slice(this.pager.startIndex, this.pager.endIndex + 1);
// }
}
