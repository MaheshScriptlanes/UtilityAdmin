import { Component, OnInit } from '@angular/core';
import { LoaListService } from '../sharedApi/loa-list.service';
import { PaginationService } from '../sharedApi/pagination.service';

@Component({
  selector: 'app-loa-list',
  templateUrl: './loa-list.component.html',
  styleUrls: ['./loa-list.component.scss']
})
export class LoaListComponent implements OnInit {

  constructor(private apiSer:LoaListService,private pagination:PaginationService) { }
  loalistObject:any;
  pager: any = {};
  pagedItems: any[];
  searchText:any;
  ngOnInit(): void {
  this.getData()
  }

getData(){
  this.apiSer.showData("getLOAData",'').subscribe((res:any)=>{
    this.loalistObject=res;
    this.setPage(1);
  })
}
setPage(page: number) {
  this.pager = this.pagination.getPager( this.loalistObject.length, page);
  this.pagedItems = this.loalistObject.slice(this.pager.startIndex, this.pager.endIndex + 1);
}
}
