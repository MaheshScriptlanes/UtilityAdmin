import { Component, OnInit } from '@angular/core';
import { NewsSerService } from '../sharedApi/news-ser.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PaginationService } from '../sharedApi/pagination.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  baseUrl:any=environment.baseurl;
  constructor(private apiSer:NewsSerService,private route:Router,private pagination:PaginationService) { }
  pager: any = {};
  pagedItems: any[];
  searchText:any;
  newsObject:any;
  ngOnInit(): void {
    this.getData();

  }

  getData(){
    this.apiSer.postData("getNewsList",'').subscribe((res:any)=>{
      this.newsObject=res;
      this.newsObject.sort((a, b) => parseFloat(b.updatedDate) - parseFloat(a.updatedDate));
      this.setPage(1);
    })

  }
  setPage(page: number) {
    this.pager = this.pagination.getPager( this.newsObject.length, page);
    this.pagedItems = this.newsObject.slice(this.pager.startIndex, this.pager.endIndex + 1);
}
  Addnews(){
    this.route.navigate(['dashboard/addNews'])
  }
  edit(obj){
    this.route.navigate(['dashboard/addNews'],{ queryParams:{ objectId:obj._id}});
  }

}
