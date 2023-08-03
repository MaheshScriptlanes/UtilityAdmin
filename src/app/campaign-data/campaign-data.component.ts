import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../sharedApi/campaign.service';
import { PaginationService } from '../sharedApi/pagination.service';

@Component({
  selector: 'app-campaign-data',
  templateUrl: './campaign-data.component.html',
  styleUrls: ['./campaign-data.component.scss']
})
export class CampaignDataComponent implements OnInit {

  constructor(private service:CampaignService,private pagination:PaginationService) { }
  campaignObj:any;
  pager: any = {};
  pagedItems: any[];
  Name:any;
  ngOnInit(): void {
    this.loadData();
  }
loadData(){
  this.service.getData("getCampaignData",'').subscribe(res=>{
    this.campaignObj=res;
    this.setPage(1);
  })
}
setPage(page: number) {
  this.pager = this.pagination.getPager( this.campaignObj.length, page);
  console.log("value of pager",this.pager)
  this.pagedItems = this.campaignObj.slice(this.pager.startIndex, this.pager.endIndex + 1);
}
// SearchDetails(){
//     this.Name= this.campaignObj.filter((val)=>{
//     (val.name.toLocaleLowerCase().includes(this.Name))
//     console.log("data in search",this.Name);
//   })
//   console.log("data in name function",this.Name);
// }
}
