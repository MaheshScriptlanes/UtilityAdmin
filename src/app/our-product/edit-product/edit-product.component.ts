import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProductListService } from 'src/app/sharedApi/product-list.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from 'src/app/sharedApi/snackbar.service';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  constructor(private fb:FormBuilder,private productService:ProductListService,private activateRoute:ActivatedRoute,private snackbar:SnackbarService,private route:Router) {
    activateRoute.queryParams.subscribe((res:any)=>{
      this.queryParams=res.objectId;
    })
   }

  ngOnInit(): void {
  this.getData();
  }
  Loader=true;
  encodedText:any;
  queryParams:any;
  editProduct=this.fb.group({
    order:[''],
    heading:[''],
    product_text:['']
  })
  edit:any;
  getData(){
    this.editProduct.value.objectId=this.queryParams;
    this.productService.showData("getProductDetails",this.editProduct.value).subscribe((res:any)=>{
      this.edit=res;
      this.Loader=false;
      this.encodedText=decodeURIComponent(this.edit.product_text);
      this.setFormValue();
    })
  }
  Cancel(){
    this.route.navigate(["dashboard/product"]);
  }
  setFormValue(){
    this.editProduct.patchValue({
      order:this.edit.order,
      heading:this.edit.heading,
      product_text:this.encodedText
    })
  }
  onSubmit(){
    
    this.editProduct.value.collection="products"
    this.editProduct.value.objectId=this.edit._id;
    this.productService.showData("updateProductData",this.editProduct.value).subscribe((res:any)=>{
      if(res.status="success"){
        this.snackbar.showMessage(res.message,'Undo')
        this.route.navigate(['dashboard/product'])
      }
      this.getData();

    })
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
