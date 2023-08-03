import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormBuilder, Validators } from '@angular/forms';
import { WhyUaService } from 'src/app/sharedApi/why-ua.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SnackbarService } from 'src/app/sharedApi/snackbar.service';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.scss']
})
export class AddAuthorComponent implements OnInit {

  constructor(private fb:FormBuilder,private whyService:WhyUaService,private route:Router,private snacbar:SnackbarService,private activateRoute:ActivatedRoute) {
    activateRoute.queryParams.subscribe((res: any) => {
      this.queryParams = res.objectId;
    });
   }

  ngOnInit(): void {
    this.getData();
  }
  formClick=true;
  editAuthorObject:any;
  queryParams: any;
  modalOpen=false;
  imageLoader=true;
  selectedImage:any;
  IsHidden= true;
  baseUrl:any=environment.baseurl;
  backGroundImage:any;
  addAuthorForm=this.fb.group({
    active:[false],
    bio:[''] , 
    first_name:[''],
    identifier:[''],
    image1:[''],
    last_name:[''],
    order_id:[Validators.pattern("^[0-9]*$")]
  })
  onSubmit(){
    this.addAuthorForm.value.active == true ? 'on' : 'off'
    if(this.addAuthorForm.value.active == true){
      this.addAuthorForm.value.active = "on";
    }
    else{
      this.addAuthorForm.value.active = "off";
    }
  if(!this.queryParams){
    this.whyService.postData('addAuthor',this.addAuthorForm.value).subscribe((res:any)=>{
      if(res.status="success"){
        this.snacbar.showMessage(res.message,'Undo')
        this.route.navigate(["dashboard/authors"]);
      }
      
    })
  }
  else{
    this.addAuthorForm.value.objectId = this.editAuthorObject._id;
    this.whyService.postData('editAuthor', this.addAuthorForm.value).subscribe((res: any) => {
      if (res.status = "success") {
        this.snacbar.showMessage(res.message, 'Undo');
        this.route.navigate(["dashboard/authors"]);
      }
      this.getData();

    })
  } 
}

  // updateData() {
  //   if(this.addAuthorForm.value.active == true){
  //     this.addAuthorForm.value.active = "on";
  //   }
  //   else{
  //     this.addAuthorForm.value.active = "off";
  //   }
  //   this.addAuthorForm.value.objectId = this.editAuthorObject._id;
  //   this.whyService.postData('editAuthor', this.addAuthorForm.value).subscribe((res: any) => {
  //     if (res.status = "success") {
  //       this.snacbar.showMessage(res.message, 'Undo');
  //       this.route.navigate(["dashboard/authors"]);
  //     }
  //     this.getData();

  //   })

  // }
  
  getData() {
    
    let data = {
      objectId: this.queryParams
    }
    this.whyService.postData("getAuthorDetails", data).subscribe((res: any) => {
      this.editAuthorObject = res;
      this.setFormValue()
    })
  }
  setFormValue() {
    this.addAuthorForm.patchValue({
      active: this.editAuthorObject.active=="on" ? true: false,
      bio: this.editAuthorObject.bio,
      first_name: this.editAuthorObject.first_name,
      identifier: this.editAuthorObject.identifier,
      image1: this.editAuthorObject.image1,
      last_name: this.editAuthorObject.last_name,
      order_id: this.editAuthorObject.order_id
    })
  }
  Cancel(){
    this.route.navigate(["dashboard/authors"]);
  }
  getImages(){
    this.modalOpen=true;
    this.whyService.getData("getAuthorImages").subscribe((res:any)=>{
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
      this.whyService.postData("uploadAuthorImages",formData).subscribe((res:any)=>{
    
      })
    });
    
  }
  attachImage(obj){
    this.selectedImage=obj.path;
    this.addAuthorForm.patchValue({
      image1:obj.path
    })
    this.modalOpen=false;
  }
 
loadImage(){
  this.IsHidden=true;
  this.IsHidden= !this.IsHidden;
}
}
