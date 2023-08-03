import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { OurClientService } from 'src/app/sharedApi/our-client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { environment } from 'src/environments/environment';
import { SnackbarService } from 'src/app/sharedApi/snackbar.service';
@Component({
  selector: 'app-add-case-study',
  templateUrl: './add-case-study.component.html',
  styleUrls: ['./add-case-study.component.scss']
})
export class AddCaseStudyComponent implements OnInit {

  constructor(private fb:FormBuilder,private addCaseStud:OurClientService,private route:Router,private snackbar:SnackbarService,private activatedRoute:ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe((res:any)=>{
      this.queryParam=res.objectId;
    });
   }
   Loader=true;
   reStr = 'utilityAid/images';
  files: any = [];
  selectedFile:any;
  queryParam:any;
  backGroundImage:any;
  baseUrl=environment.baseurl;
  modalOpen=false;
  imageLoader=true;
  IsHidden= true;
  editorText1:any;
  editorText2:any;
  editorText3:any;
  editorText4:any;
  editorText5:any;
  editorText6:any;
  editorText7:any;
  editorText8:any;
  editorText9:any;
  editCaseStudyObject:any;
  ngOnInit(): void {
    this.getData();
  }
  
  editCaseStudyform=this.fb.group({
    active:[false],
    slug:[''],
     title:[''],
     home_page_case_study_button_text:[''],
     home_page_feature_title:[''] ,
     home_page_listing_excerpt:[''], 
      home_page_ua_action:[''],
     banner_col_1_text:[''],
     banner_col_1_title:[''],
     banner_col_2_text:[''],
     banner_col_2_title:[''],
     banner_col_3_text:[''], 
     banner_col_3_title:[''],
     banner_title:[''],
 block_1_col_1_title:[''],
 block_1_col_2_title:[''],
 block_1_col_3_title:[''],
 block_1_sub_title:[''],
 block_1_title:[''],
 block_2_author:[''],
 block_2_city:[''],
 block_2_quote:[''],
 block_3_col_1_title:[''],
 block_3_col_2_title:[''],
 block_3_col_3_title:[''],
 block_3_sub_title:[''],
 block_3_title:[''],
 block_4_author:[''],
 block_4_city:[''],
 block_4_quote:[''],
 block_5_col_1_title:[''],
 block_5_col_2_title: [''],
 block_5_col_3_title: [''],
 block_5_sub_title:[''],
 block_5_title:[''],
 meta_data_meta_description:[''],
 meta_data_meta_title:[''],
 editor1:[''],
 editor2:[''],
 editor3:[''],
 editor4:[''],
 editor5:[''],
 editor6:[''],
 editor7:[''],
 editor8:[''],
 editor9:[''],
 image1:[''],
 image2:[''],
 image3:['']
 })
 onSubmit(){
  if(this.editCaseStudyform.value.active == true){
    this.editCaseStudyform.value.active = "on";
  }
  else{
    this.editCaseStudyform.value.active = "off";
  } if(!this.queryParam){
    this.addCaseStud.postData("addCaseStudies",this.editCaseStudyform.value).subscribe((res:any)=>{
      if(res.status=='success'){
        this.snackbar.showMessage(res.message,'Undo')
        this.route.navigate(["dashboard/casestudy"]);
      }
    })
  }else{
    this.editCaseStudyform.value.objectId=this.editCaseStudyObject._id;
    this.addCaseStud.postData("editCaseStudies",this.editCaseStudyform.value).subscribe((res:any)=>{
      if(res.status="success"){
        this.snackbar.showMessage(res.message,'Undo')
        this.route.navigate(["dashboard/casestudy"]);
      }
      this.getData();
    })
  }
  
 }


 Cancel(){
  this.route.navigate(["dashboard/casestudy"]);
}

getData(){

  let data={
    objectId:this.queryParam
  }
  this.addCaseStud.postData("getCaseStudiesDetails",data).subscribe((res:any)=>{
  this.editCaseStudyObject=res;
 this.editorText1= this.editCaseStudyObject.editor1.replace(new RegExp(this.reStr, 'g'),this.baseUrl+'utilityAid/images');
 this.editorText2= this.editCaseStudyObject.editor2.replace(new RegExp(this.reStr, 'g'),this.baseUrl+'utilityAid/images');
 this.editorText3= this.editCaseStudyObject.editor3.replace(new RegExp(this.reStr, 'g'),this.baseUrl+'utilityAid/images');
 this.editorText4= this.editCaseStudyObject.editor4.replace(new RegExp(this.reStr, 'g'),this.baseUrl+'utilityAid/images');
 this.editorText5= this.editCaseStudyObject.editor5.replace(new RegExp(this.reStr, 'g'),this.baseUrl+'utilityAid/images');
 this.editorText6= this.editCaseStudyObject.editor6.replace(new RegExp(this.reStr, 'g'),this.baseUrl+'utilityAid/images');
 this.editorText7= this.editCaseStudyObject.editor7.replace(new RegExp(this.reStr, 'g'),this.baseUrl+'utilityAid/images');
 this.editorText8= this.editCaseStudyObject.editor8.replace(new RegExp(this.reStr, 'g'),this.baseUrl+'utilityAid/images');
 this.editorText9= this.editCaseStudyObject.editor9.replace(new RegExp(this.reStr, 'g'),this.baseUrl+'utilityAid/images');
  this.Loader=false;
  this.setFormValue();
  })
}
setFormValue(){
  this.editCaseStudyform.patchValue({
    active:this.editCaseStudyObject.active=="on" ? true: false,
     slug:this.editCaseStudyObject.slug,
      title:this.editCaseStudyObject.title,
      home_page_case_study_button_text:this.editCaseStudyObject.home_page_case_study_button_text,
      home_page_feature_title:this.editCaseStudyObject.home_page_feature_title,
      home_page_listing_excerpt:this.editCaseStudyObject.home_page_listing_excerpt,
       home_page_ua_action:this.editCaseStudyObject.home_page_ua_action,
      banner_col_1_text:this.editCaseStudyObject.banner_col_1_text,
      banner_col_1_title:this.editCaseStudyObject.banner_col_1_title,
      banner_col_2_text:this.editCaseStudyObject.banner_col_2_text,
      banner_col_2_title:this.editCaseStudyObject.banner_col_2_title,
      banner_col_3_text:this.editCaseStudyObject.banner_col_3_text,
      banner_col_3_title:this.editCaseStudyObject.banner_col_3_title,
      banner_title:this.editCaseStudyObject.banner_title,
  block_1_col_1_title:this.editCaseStudyObject.block_1_col_1_title,
  block_1_col_2_title:this.editCaseStudyObject.block_1_col_2_title,
  block_1_col_3_title:this.editCaseStudyObject.block_1_col_3_title,
  block_1_sub_title:this.editCaseStudyObject.block_1_sub_title,
  block_1_title:this.editCaseStudyObject.block_1_title,
  block_2_author:this.editCaseStudyObject.block_2_author,
  block_2_city:this.editCaseStudyObject.block_2_city,
  block_2_quote:this.editCaseStudyObject.block_2_quote,
  block_3_col_1_title:this.editCaseStudyObject.block_3_col_1_title,
  block_3_col_2_title:this.editCaseStudyObject.block_3_col_2_title,
  block_3_col_3_title:this.editCaseStudyObject.block_3_col_3_title,
  block_3_sub_title:this.editCaseStudyObject.block_3_sub_title,
  block_3_title:this.editCaseStudyObject.block_3_title,
  block_4_author:this.editCaseStudyObject.block_4_author,
  block_4_city:this.editCaseStudyObject.block_4_city,
  block_4_quote:this.editCaseStudyObject.block_4_quote,
  block_5_col_1_title:this.editCaseStudyObject.block_5_col_1_title,
  block_5_col_2_title:this.editCaseStudyObject.block_5_col_2_title,
  block_5_col_3_title:this.editCaseStudyObject.block_5_col_3_title,
  block_5_sub_title:this.editCaseStudyObject.block_5_sub_title,
  block_5_title:this.editCaseStudyObject.block_5_title,
  meta_data_meta_description:this.editCaseStudyObject.meta_data_meta_description,
  meta_data_meta_title:this.editCaseStudyObject.meta_data_meta_title,
  editor1:this.editorText1,
  editor2:this.editorText2,
  editor3:this.editorText3,
  editor4:this.editorText4,
  editor5:this.editorText5,
  editor6:this.editorText6,
  editor7:this.editorText7,
  editor8:this.editorText8,
  editor9:this.editorText9,
  image1:this.editCaseStudyObject.image1,
  image2:this.editCaseStudyObject.image2,
  image3:this.editCaseStudyObject.image3,
  
  })  
  }

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
    this.addCaseStud.postData("uploadBackgroundImages",formData).subscribe((res:any)=>{
    })
  });
  
}
selectImageOne(obj){
  this.editCaseStudyform.patchValue({
    image1:obj.path
  })
  this.modalOpen=false;
}
selectImageTwo(obj){
  this.editCaseStudyform.patchValue({
    image2:obj.path
  })
  this.modalOpen=false;
}
selectImageThree(obj){
  this.editCaseStudyform.patchValue({
    image3:obj.path
  })
  this.modalOpen=false;
}
loadImage(){
    this.IsHidden=true;
    this.IsHidden= !this.IsHidden;
  }
  // deleteAttachment(index) {
  //   this.files.splice(index, 1)
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
  sanitize: true,
  toolbarPosition: 'top',
  toolbarHiddenButtons: [
    
  ]
};
getImages(){
  this.modalOpen=true;
  this.addCaseStud.getData("getBackgroundImages").subscribe((res:any)=>{
    if(res[0].status=="success"){
      this.imageLoader=false; 
     }
    this.backGroundImage=res;
  })
}
}
