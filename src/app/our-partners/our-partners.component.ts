import { Component, OnInit } from '@angular/core';
import { OurClientService } from '../sharedApi/our-client.service';
import { Router } from '@angular/router';
import { PaginationService } from '../sharedApi/pagination.service';

@Component({
  selector: 'app-our-partners',
  templateUrl: './our-partners.component.html',
  styleUrls: ['./our-partners.component.scss']
})
export class OurPartnersComponent implements OnInit {

  constructor(private apiSer:OurClientService,private route:Router,private paginator:PaginationService) { }
  ourPartner:any;
  pager: any = {};
  pagedItems: any[];
  searchText:any;
  ngOnInit(): void {
    this.getData();
  }
getData(){
  this.apiSer.postData("getPartnerList","").subscribe((res:any)=>{
    this.ourPartner=res;
    this.ourPartner.sort((a, b) => parseFloat(b.updatedDate) - parseFloat(a.updatedDate));
    // this.setPage(1)
  })
}
// setPage(page: number) {
//   this.pager = this.paginator.getPager( this.ourPartner.length, page);
//   this.pagedItems = this.ourPartner.slice(this.pager.startIndex, this.pager.endIndex + 1);
// }
Edit(obj){
this.route.navigate(['dashboard/addPartner'],{ queryParams:{ objectId:obj._id} })
}
addPartner(){
  this.route.navigate(['dashboard/addPartner'])
}
}
