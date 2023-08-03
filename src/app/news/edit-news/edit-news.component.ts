import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NewsSerService } from 'src/app/sharedApi/news-ser.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { environment } from 'src/environments/environment';
import { DateFormatPipe } from 'src/app/date-format.pipe';
import { SnackbarService } from 'src/app/sharedApi/snackbar.service';
@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.scss']
})
export class EditNewsComponent implements OnInit {

  constructor(private fb:FormBuilder,private newsService:NewsSerService,private route:Router,
    private datePipe:DateFormatPipe,private activateRoute:ActivatedRoute,private snackbar:SnackbarService) {
      activateRoute.queryParams.subscribe((res:any)=>{
        this.queryParams=res.objectId;
      })
     }
selectedFile:any;
queryParams:any;
files: any = [];
previewImage:any;
Loader=true;
baseUrl=environment.baseurl;
  ngOnInit(): void {
  this.getData();
  }
  editNewsObject:any;
  newsForm=this.fb.group({
    active:[''],
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
onSubmit(){
  // this.newsForm.value.active == true.valueOf ? 'on' : 'off'
  // console.log("value of  on or of after submit", this.newsForm.value.active == true.valueOf ? 'on' : 'off')
  if(this.newsForm.value.active == true){
    this.newsForm.value.active = "on";
  }
  else{
    this.newsForm.value.active = "off";
  }

  this.newsForm.value.objectId=this.editNewsObject._id;
  this.newsService.postData('editNews',this.newsForm.value).subscribe((res:any)=>{
    if(res.status="success"){
      this.snackbar.showMessage(res.message,'Undo')
      this.route.navigate(['dashboard/news']);
    }
    this.getData();
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