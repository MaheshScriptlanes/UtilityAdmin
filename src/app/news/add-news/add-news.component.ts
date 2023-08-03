import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { NewsSerService } from 'src/app/sharedApi/news-ser.service';

import { AngularEditorConfig } from '@kolkov/angular-editor';
import { environment } from 'src/environments/environment';
import { SnackbarService } from 'src/app/sharedApi/snackbar.service';
@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.scss']
})
export class AddNewsComponent implements OnInit {

  constructor(private route:Router,private fb:FormBuilder,private activateRoute:ActivatedRoute,private newsService:NewsSerService,private snackbar:SnackbarService) { 
    activateRoute.queryParams.subscribe((res:any)=>{
      this.queryParams=res.objectId;
    })
  }

  ngOnInit(): void {
  this.getData();
  }
  queryParams:any;
  editNewsObject:any;
  selectedFile:any;
  files: any = [];
  Loader=true;
  previewImage:any;
  baseUrl:any=environment.baseurl;
  newsForm=this.fb.group({
    active:[false],
    newsdate:[''],
    heading:[''],
    description:[''],
    image:['']
  })
Cancel(){
  this.route.navigate(['dashboard/news']);
}
getData(){
  let data={
    objectId:this.queryParams
  }
    this.newsService.postData("getNewsDetails",data).subscribe((res:any)=>{
      this.editNewsObject=res;
      this.Loader=false;
      this.setFormValue();
    })
  }
  
setFormValue(){
  this.newsForm.patchValue({
    active:this.editNewsObject.active=="on" ? true: false,
    newsdate:this.editNewsObject.newsdate,
    heading:this.editNewsObject.heading,
    description:this.editNewsObject.description,
    image:this.editNewsObject.image
  })
}


uploadFile(event) {
for (let index = 0; index < event.length; index++) {
    const element = event[index];
    this.files.push(element)
  this.selectedFile=<File>this.files;
  this.uploadImage();
}
}
uploadImage(){
  this.selectedFile.forEach(obj => {
    const formData: FormData = new FormData();
    formData.append('file', obj,obj.name);
    this.newsService.uploadImages("uploadUANewsPhoto",formData,{ responseType: 'text' as 'json' }).subscribe((res:any)=>{
      console.log("upload image",res);
      this.previewImage=res;
      this.newsForm.patchValue({
        image:this.previewImage
      })
    })
  });
  
}
 
onSubmit(){
  // this.newsForm.value.active = true ? 'on' : 'off';
  if(this.newsForm.value.active == true){
    this.newsForm.value.active = "on";
  }
  else{
    this.newsForm.value.active = "off";
  }
  if(!this.queryParams){
    this.newsService.postData('addNews',this.newsForm.value).subscribe((res:any)=>{
      if(res.status="success"){
       this.snackbar.showMessage(res.message,'Undo');
       this.route.navigate(['dashboard/news']);
     }
    })
  }else{
    this.newsForm.value.objectId=this.editNewsObject._id;
  this.newsService.postData('editNews',this.newsForm.value).subscribe((res:any)=>{
    if(res.status="success"){
      this.snackbar.showMessage(res.message,'Undo')
      this.route.navigate(['dashboard/news']);
    }
    this.getData();
  })
  }
 
  

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
