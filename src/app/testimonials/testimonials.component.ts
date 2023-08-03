import { Component, OnInit } from '@angular/core';
import { TestiMonialsService } from '../sharedApi/testi-monials.service';
import { Router } from '@angular/router';
import { PaginationService } from '../sharedApi/pagination.service';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit {

  constructor(private apiSer:TestiMonialsService,private route:Router,private paginator:PaginationService) { }
  testiMony:any;
  Loader=true;
  pager: any = {};
  pagedItems: any[];
  searchText:any;
  ngOnInit(): void {
    this.getData();
  }
  getData(){
    this.apiSer.showData("getTestimonials",'').subscribe((res:any)=>{
      console.log("response from tes",res);
      this.testiMony=res;
      this.Loader=false;
      this.testiMony.sort((a, b) => parseFloat(b.updatedDate) - parseFloat(a.updatedDate));
    })
  }
  Addtestimony(){
    this.route.navigate(['dashboard/addTestimony'])
  }
  // setPage(page: number) {
  //   this.pager = this.paginator.getPager( this.testiMony.length, page);
  //   console.log("value of pager",this.pager)
  //   this.pagedItems = this.testiMony.slice(this.pager.startIndex, this.pager.endIndex + 1);
  // }
  edit(obj){
    this.route.navigate(['dashboard/addTestimony'],{ queryParams:{ objectId:obj._id} })
    
  }
}
