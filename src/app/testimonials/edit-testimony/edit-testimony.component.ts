import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormBuilder } from '@angular/forms';
import { TestiMonialsService } from 'src/app/sharedApi/testi-monials.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from 'src/app/sharedApi/snackbar.service';
@Component({
  selector: 'app-edit-testimony',
  templateUrl: './edit-testimony.component.html',
  styleUrls: ['./edit-testimony.component.scss']
})
export class EditTestimonyComponent implements OnInit {

  constructor(private fb:FormBuilder,private testService:TestiMonialsService,private activateRoute:ActivatedRoute,private snackbar:SnackbarService,private route:Router) {
    activateRoute.queryParams.subscribe((res:any)=>{
      this.queryParams=res.objectId;
    })
   }

  ngOnInit(): void {
    this.getData();
  }
  decodedText:any;
  queryParams:any;
  editTestimonyObject:any;
  editTestimonyForm=this.fb.group({
    name:[''],
    testimonial:['']
  })
  getData(){

    let data={
      objectId:this.queryParams
    }
    this.testService.showData("getTestimonialDetails",data).subscribe((res:any)=>{
      console.log('response from editTesti',res);
      this.editTestimonyObject=res;
      this.decodedText=decodeURIComponent(this.editTestimonyObject.testimonial)
      this.setFormvalue();
    })
   }
   setFormvalue(){
     this.editTestimonyForm.patchValue({
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
        
      ]
  };

  onSubmit(){
  this.editTestimonyForm.value.objectId=this.editTestimonyObject._id;
    this.testService.showData('edittestimonials',this.editTestimonyForm.value).subscribe((res:any)=>{
      if(res.status="success"){
        this.snackbar.showMessage(res.message,'Undo')
        this.route.navigate(['dashboard/testimony'])
      }
      console.log("data after submit",res);
      this.getData();
    }) 
  }
  Cancel(){
    this.route.navigate(['dashboard/testimony'])
  }
}
