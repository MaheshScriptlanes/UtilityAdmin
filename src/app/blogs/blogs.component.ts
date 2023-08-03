import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WhyUaService } from '../sharedApi/why-ua.service';
import { PaginationService } from '../sharedApi/pagination.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  modifyBlogObject:any;
  constructor(private route:Router,private apiSer:WhyUaService,private paginator:PaginationService) { }
  blogObject:any;
  searchText:any;
  pager: any = {};
  pagedItems: any[];
  ngOnInit(): void {
    this.getData();

  }
  addBlog(){
    this.route.navigate(['dashboard/addBlog']);
  }
  getData(){
    this.apiSer.postData("getBlogList","").subscribe((res:any)=>{
      this.blogObject=res;
      this.blogObject.sort((a, b) => parseFloat(b.updatedDate) - parseFloat(a.updatedDate));
      // this.setPage(1);
    })
  }
//   setPage(page: number) {
//     this.pager = this.paginator.getPager( this.blogObject.length, page);
//     this.pagedItems = this.blogObject.slice(this.pager.startIndex, this.pager.endIndex + 1);
// }
  edit(object){
    
  
    this.route.navigate(['dashboard/editBlog'],{ queryParams:{ objectId:object._id} }); 
}

}
