import { Component, OnInit } from '@angular/core';
import { ProductListService } from '../sharedApi/product-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-our-product',
  templateUrl: './our-product.component.html',
  styleUrls: ['./our-product.component.scss']
})
export class OurProductComponent implements OnInit {

  constructor(private apiSer:ProductListService,private route:Router) { }
  ngOnInit(): void {
  this.getData();
  }
  productObject:any;
  getData(){
    let data={
      collection: "products"
    }
    this.apiSer.showData("getProductList",data).subscribe((res:any)=>{
      this.productObject=res;
      this.productObject.sort((a, b) => parseFloat(a.order) - parseFloat(b.order));
    })
  }
  edit(obj){
    this.route.navigate(['dashboard/addProduct'],{ queryParams:{ objectId:obj._id}});
  }
  addStrategy(){
    this.route.navigate(["dashboard/addProduct"])
  }

}
