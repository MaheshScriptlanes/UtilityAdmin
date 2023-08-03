import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { OurClientService } from 'src/app/sharedApi/our-client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SnackbarService } from 'src/app/sharedApi/snackbar.service';

@Component({
  selector: 'app-edit-partner',
  templateUrl: './edit-partner.component.html',
  styleUrls: ['./edit-partner.component.scss']
})
export class EditPartnerComponent implements OnInit {

  constructor(private fb:FormBuilder,private editPartnerService:OurClientService,private route:Router,private activateRoute:ActivatedRoute,private snackbar:SnackbarService) {
    activateRoute.queryParams.subscribe((res:any)=>{
      this.queryParams=res.objectId;
    })
   }

  ngOnInit(): void {
  this.getData()
  }
  modalOpen=false;
  imageLoader=true;
  queryParams:any;
  baseUrl=environment.baseurl
  editPartner:any;
  editPartnerForm=this.fb.group({
    active:[''],
    image1:[''],
    partner_name:[''],
    link:['']
  })
  getData(){
    let jsonOBJ=JSON.parse(localStorage.getItem('editPartner'));
    let data={
      objectId:this.queryParams
    }
    this.editPartnerService.postData("getPartnerDetails",data).subscribe((res:any)=>{
      this.editPartner=res;
      this.setFormvalue();
    })
    
  }
  loadImage(){
    this.IsHidden=true;
    this.IsHidden= !this.IsHidden;
  }
  setFormvalue(){
    this.editPartnerForm.patchValue({
      active:this.editPartner.active=="on" ? true: false,
      image1:this.editPartner.image1,
      partner_name:this.editPartner.partner_name,
      link:this.editPartner.link
    })
  }
  onSubmit(){
    if(this.editPartnerForm.value.active == true){
      this.editPartnerForm.value.active = "on";
    }
    else{
      this.editPartnerForm.value.active = "off";
    }
    this.editPartnerForm.value.objectId=this.editPartner._id;
    this.editPartnerService.postData("editPartners",this.editPartnerForm.value).subscribe((res:any)=>{
      if(res.status="success"){
        this.snackbar.showMessage(res.message,'Undo')
        this.route.navigate(['dashboard/partner'])
      }
      this.getData();
      
    })
  }
  backGroundImage:any;

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

getImages(){
  this.modalOpen=true
  this.editPartnerService.getData("getPartnerImages").subscribe((res:any)=>{
    if(res[0].status=="success"){
      this.imageLoader=false; 
     }
    this.backGroundImage=res;
  })
}
selectedImage:any;

  uploadImage(){
    this.selectedFile.forEach(obj => {
      const formData: FormData = new FormData();
      formData.append('file', obj,obj.name);
      this.editPartnerService.postData("uploadPartnerImages"
        ,formData).subscribe((res:any)=>{
        console.log("upload image",res);
      })
    });
    
  }
  IsHidden=true;
  attachImage(obj){
    this.selectedImage=obj.path;
    this.editPartnerForm.patchValue({
      image1:obj.path
    })
    this.modalOpen=false;
  }
  Cancel(){
    this.route.navigate(['dashboard/partner'])
  }
  
}
