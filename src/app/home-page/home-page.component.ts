import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HomePageService } from '../sharedApi/home-page.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { SnackbarService } from '../sharedApi/snackbar.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private fb:FormBuilder,private homeApi:HomePageService,private snackbar:SnackbarService) { }
  encodedText:any;
  homeObj:any;
  responseMsg:any;
  ngOnInit(): void {
    this.getData()
 
  }
homePageForm=this.fb.group({
  text1:[''],
  text2:[''],
  text3:[''],
  text4:[''],
})
onSubmit(){
  this.homePageForm.value.collection = "home";
  this.homePageForm.value.objectId = this.homeObj._id;
  this.homeApi.postData(this.homePageForm.value).subscribe((res:any)=>{
    this.getData();
    if(res.status="success"){
      this.responseMsg=res.message;
      this.snackbar.showMessage(this.responseMsg,'Undo')
     
    }
  })
  

}
getData(){
  let data = {
    collection: "home"
  }
  this.homeApi.showData(data).subscribe((res:any)=>{
    this.homeObj=res[0];
    this.encodedText= decodeURIComponent(this.homeObj.text4.replace(/%(?!\d+)/g, '%25'));
    this.setFormValue();
 
    // this.homePageForm.patchValue({
    //   text4:doc
    // })

  });

}
setFormValue(){
  this.homePageForm.patchValue({
    text1:this.homeObj.text1,
    text2:this.homeObj.text2,
    text3:this.homeObj.text3,
    text4:this.encodedText

  });
}
// uploadimgage(event){
//   console.log("event in button upload",event);
// }
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
  sanitize:false,
  toolbarPosition: 'top',
  toolbarHiddenButtons: [
    // ['bold', 'italic'],
    // ['fontSize']
  ]
};

}
