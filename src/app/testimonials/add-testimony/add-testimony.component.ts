import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { TestiMonialsService } from 'src/app/sharedApi/testi-monials.service';
import { SnackbarService } from 'src/app/sharedApi/snackbar.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-testimony',
  templateUrl: './add-testimony.component.html',
  styleUrls: ['./add-testimony.component.scss']
})
export class AddTestimonyComponent implements OnInit {

  constructor(private fb:FormBuilder,
    private testiMonialService:TestiMonialsService,private snackbar:SnackbarService,private route:Router,private activareRoute:ActivatedRoute) { 
      activareRoute.queryParams.subscribe((res:any)=>{
        this.queryParams=res.objectId;
      })
    }
    decodedText:any;
    queryParams:any;
    editTestimonyObject:any;
  homePageForm=this.fb.group({
    name:[''],
    testimonial:['']
  })
  ngOnInit(): void {
    this.getData();
  }


  onSubmit(){
    if(!this.queryParams){
    this.testiMonialService.showData('addtestimonials',this.homePageForm.value).subscribe((res:any)=>{
      if(res.status="success"){
        this.snackbar.showMessage("Data added successfully",'Undo')
        this.route.navigate(['dashboard/testimony'])
      }
    
    })
    }else{
      this.homePageForm.value.objectId=this.editTestimonyObject._id;
    this.testiMonialService.showData('edittestimonials',this.homePageForm.value).subscribe((res:any)=>{
      if(res.status="success"){
        this.snackbar.showMessage("Data updated successfully",'Undo')
        this.route.navigate(['dashboard/testimony'])
      }
      this.getData();
    })
    }
  }
  
  getData(){

    let data={
      objectId:this.queryParams
    }
    this.testiMonialService.showData("getTestimonialDetails",data).subscribe((res:any)=>{
      console.log('response from editTesti',res);
      this.editTestimonyObject=res;
      this.decodedText=decodeURIComponent(this.editTestimonyObject.testimonial)
      this.setFormvalue();
    })
   }
   setFormvalue(){
     this.homePageForm.patchValue({
       name:this.editTestimonyObject.name,
       testimonial:this.decodedText
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
Cancel(){
  this.route.navigate(['dashboard/testimony'])
}
}
