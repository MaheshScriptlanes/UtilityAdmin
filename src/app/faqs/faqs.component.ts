import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FaqserviceService } from '../sharedApi/faqservice.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { SnackbarService } from '../sharedApi/snackbar.service';
@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FaqsComponent implements OnInit {

  constructor(private fb:FormBuilder,private faqService:FaqserviceService,private snackbar:SnackbarService) { }
  responseMsg:any;
  faqObject:any;
  Loader=true;
  editorText:any;
  decodedText:any;
  ngOnInit(): void {
  this.getData();
  }
  faqForm=this.fb.group({
    product_text:['']
  })
  getData(){
    let data={
      collection: "faq"
    }
    this.faqService.showData('getProductList',data).subscribe((res:any)=>{
      this.faqObject=res[0];
      this.Loader=false;
      this.decodedText=decodeURIComponent(this.faqObject.product_text)
      this.setFormvalue();
    })
  }
  setFormvalue(){
    this.faqForm.patchValue({
      product_text:this.decodedText
    })
  }
onSubmit(){
  this.faqForm.value.collection="faq";
  this.faqService.showData("updateProductData",this.faqForm.value).subscribe((res:any)=>{
    if(res.status=="success"){
      this.responseMsg="Data Updated successfully"
      this.snackbar.showMessage(this.responseMsg,'Undo')
    }
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
      ['bold', 'italic'],
      ['fontSize']
    ]
};
}
