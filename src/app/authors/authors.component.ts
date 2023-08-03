import { Component, OnInit } from '@angular/core';
import { WhyUaService } from '../sharedApi/why-ua.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {

  constructor(private apiSer:WhyUaService,private route:Router) { }
  authorObj:any;
  searchText:any;
  ngOnInit(): void {
   this.getData();
  }
 getData(){
  this.apiSer.getData("getAuthorList").subscribe((res:any)=>{
     this.authorObj=res;
     this.authorObj.sort((a, b) => parseFloat(a.order_id) - parseFloat(b.order_id));
   })
}
edit(obj){
this.route.navigate(['dashboard/addAuthor'],{ queryParams:{ objectId:obj._id} });
}
addAuthor(){
  this.route.navigate(['dashboard/addAuthor'])
}
}

