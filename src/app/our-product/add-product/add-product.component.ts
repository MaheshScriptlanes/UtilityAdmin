import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProductListService } from 'src/app/sharedApi/product-list.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { SnackbarService } from 'src/app/sharedApi/snackbar.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  constructor(private fb:FormBuilder,private productService:ProductListService,private snackbar:SnackbarService,private route:Router,private activateRoute:ActivatedRoute) {
    activateRoute.queryParams.subscribe((res:any)=>{
      this.queryParams=res.objectId;
    })
   }

  ngOnInit(): void {
  this.getData();
  }
  Loader=true;
  queryParams:any;
  encodedText:any;
  addProduct=this.fb.group({
    order:[''],
    heading:[''],
    product_text:['']
  })

  edit:any;
  getData(){
    this.addProduct.value.objectId=this.queryParams;
    this.productService.showData("getProductDetails",this.addProduct.value).subscribe((res:any)=>{
      this.edit=res;
      this.Loader=false;
      this.encodedText=decodeURIComponent(this.edit.product_text);
      this.setFormValue();
    })
  }
  setFormValue(){
    this.addProduct.patchValue({
      order:this.edit.order,
      heading:this.edit.heading,
      product_text:this.encodedText
    })
  }
onSubmit(){
 if(!this.queryParams){
  this.addProduct.value.collection="products"
  this.productService.showData("insertProductData",this.addProduct.value).subscribe((res:any)=>{
    if(res.status="success"){
      this.snackbar.showMessage(res.message,'Undo')
      this.route.navigate(['dashboard/product'])
    }
  })
 }else{
   
  this.addProduct.value.collection="products"
  this.addProduct.value.objectId=this.edit._id;
  this.productService.showData("updateProductData",this.addProduct.value).subscribe((res:any)=>{
    if(res.status="success"){
      this.snackbar.showMessage(res.message,'Undo')
      this.route.navigate(['dashboard/product'])
    }
    this.getData();

  })
 }
 
}
Cancel(){
  this.route.navigate(["dashboard/product"]);
}
editorConfig: AngularEditorConfig = {
  editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'calibri', name: 'Calibri'},
      {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    ],
    customClasses: [
    {
      name: 'quote',
      class: 'quote',
    },
    {
      name: 'redText',
      class: 'redText'
    },
    {
      name: 'titleText',
      class: 'titleText',
      tag: 'h1',
    },
  ],
  uploadUrl: 'v1/image',
  uploadWithCredentials: false,
  sanitize: true,
  toolbarPosition: 'top',
  toolbarHiddenButtons: [
   
  ]
};
}
