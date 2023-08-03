import { Component, OnInit } from '@angular/core';
import { OurClientService } from '../sharedApi/our-client.service';
import { EditCaseStudyComponent } from './edit-case-study/edit-case-study.component';
import { EditBlogComponent } from '../edit-blog/edit-blog.component';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PaginationService } from '../sharedApi/pagination.service';

@Component({
  selector: 'app-case-studies',
  templateUrl: './case-studies.component.html',
  styleUrls: ['./case-studies.component.scss']
})
export class CaseStudiesComponent implements OnInit {

  constructor(private apiSer:OurClientService,private route:Router,private paginator:PaginationService) { }
    caseStudy:any;
    searchText:any;
    pager: any = {};
  pagedItems: any[];
  ngOnInit(): void {
  this.getData();
  }
  baseUrl=environment.baseurl;
getData(){
  this.apiSer.postData("getCaseStudyList",'').subscribe((res:any)=>{
    this.caseStudy=res;
    this.caseStudy.sort((a, b) => parseFloat(b.updatedDate) - parseFloat(a.updatedDate));
    // this.setPage(1);
  })
  
}
// setPage(page: number) {
//   this.pager = this.paginator.getPager( this.caseStudy.length, page);
//   this.pagedItems = this.caseStudy.slice(this.pager.startIndex, this.pager.endIndex + 1);
// }
edit(obj:any){
  this.route.navigate(['dashboard/addCaseStudy'],{ queryParams:{ objectId:obj._id} });
}
addCase(){
  this.route.navigate(['dashboard/addCaseStudy']);
}
}
