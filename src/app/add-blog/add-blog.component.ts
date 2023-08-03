import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { WhyUaService } from '../sharedApi/why-ua.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { SnackbarService } from '../sharedApi/snackbar.service';
import { DatePipe } from '@angular/common';
import { DateFormatPipe } from '../date-format.pipe';
@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss']
})
export class AddBlogComponent implements OnInit {

  constructor(private fb:FormBuilder,private apiSer:WhyUaService,private route:Router,private snakbar:SnackbarService,private datePipe:DateFormatPipe) { }

  ngOnInit(): void {
  this.getAuthorlist();
  }
  myDate:any;
  selectedAuthor:any;
  convertedDate=new Date();
  modalOpen=false;
  imageLoader=true;
  responseMsg:any
  authorList:any;
  selectedImage:any;
  IsHidden= true;
  baseUrl:any=environment.baseurl;
  backGroundImage:any;
  addBlogForm=this.fb.group({
    active:[false],
    author: [''],
    display_title:[''],
    editor1:[''],
    image1:[''],
    meta_data_meta_description:[''],
    meta_data_meta_title:[''],
    page_content_excerpt:[''],
    page_content_extended_title:[''],
    publish_date_0:[''],
    slug:[''],
    thumbImage:[''],
    title:[''],
  })
  onSubmit(){
    // this.addBlogForm.value.active ==true ? 'on' : 'off'
    if(this.addBlogForm.value.active == true){
      this.addBlogForm.value.active = "on";
    }
    else{
      this.addBlogForm.value.active = "off";
    }
    // this.myDate=this.addBlogForm.value.publish_date_0.toLocaleString('en-GB');
    this.addBlogForm.value.publish_date_0=this.datePipe.transform(this.addBlogForm.value.publish_date_0);
    console.log("data after publish",this.addBlogForm.value.publish_date_0);
  this.apiSer.postData('addBlog',this.addBlogForm.value).subscribe((res:any)=>{
    console.log("data after form submit",this.addBlogForm.value);
    if(res.status="success"){
      this.responseMsg=res.message;
      this.snakbar.showMessage(this.responseMsg,'Undo');
      this.route.navigate(["dashboard/blogs"]);
    }
  })
  }
  Cancel(){
    this.route.navigate(["dashboard/blogs"]);
  }
  getImages(){
    this.modalOpen=true;
    this.apiSer.getData("getBackgroundImages").subscribe((res:any)=>{
      if(res[0].status=="success"){
        this.imageLoader=false; 
       }
      this.backGroundImage=res;
    })
  }
  selectedFile:any;
  files: any = [];

  uploadFile(event) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.files.push(element)
    this.selectedFile=<File>this.files;
    this.uploadImage();
    this.getImages();

}
}
  uploadImage(){
    this.selectedFile.forEach(obj => {
      const formData: FormData = new FormData();
      formData.append('file', obj,obj.name);
      this.apiSer.postData("uploadBackgroundImages",formData).subscribe((res:any)=>{
      })
    });
    
  }
  attachImage(obj){
    this.selectedImage=obj.path;
    this.addBlogForm.patchValue({
      image1:obj.path
    })
    this.modalOpen=false;
  }
 
loadImage(){
  this.IsHidden=true;
  this.IsHidden= !this.IsHidden;
}
getAuthorlist(){
  this.apiSer.getData("getAuthorList").subscribe((res:any)=>{
    this.authorList=res;
  })
}
// checkedList = []

// onCheckboxChange(option, event) {
//   // console.log('option', option)
//      if(event.target.checked) {
//        this.checkedList.push(option._id)
//      } else {
//      for(var i=0 ; i < this.checkedList.length; i++) {
//        if(this.checkedList[i] == option._id) {
//          this.checkedList.splice(i,1);
//       }
//     }
    
//   }
//   console.log("value in checklist",this.checkedList);
//   this.checkedList.forEach(obj=>{
//     this.selectedAuthor=obj;
//   })
//   console.log("data after array reverse",this.selectedAuthor)

// }

editorConfig: AngularEditorConfig = {
  editable: true,
    spellcheck: true,
    height: '300px',
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
