import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { OurClientService } from 'src/app/sharedApi/our-client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SnackbarService } from 'src/app/sharedApi/snackbar.service';

@Component({
  selector: 'app-add-partner',
  templateUrl: './add-partner.component.html',
  styleUrls: ['./add-partner.component.scss']
})
export class AddPartnerComponent implements OnInit {

  constructor(private fb:FormBuilder,private addPartnerService:OurClientService,private route:Router,private snackbar:SnackbarService,private activateRoute:ActivatedRoute) {
    activateRoute.queryParams.subscribe((res:any)=>{
      this.queryParams=res.objectId;
    })
   }
   editPartner:any;
  queryParams:any;
  modalOpen=false;
  imageLoader=true;
  backGroundImage:any;
  baseUrl=environment.baseurl;
  ngOnInit(): void {
    this.getData();
  }
  addPartnerForm=this.fb.group({
    active:[false],
    image1:[''],
    partner_name:[''],
    link:[''],
  })
  IsHidden=true;
  loadImage(){
    this.IsHidden=true;
    this.IsHidden= !this.IsHidden;
  }
  
onSubmit(){
  if(this.addPartnerForm.value.active == true){
    this.addPartnerForm.value.active = "on";
  }
  else{
    this.addPartnerForm.value.active = "off";
  }
  if(!this.queryParams){
    this.addPartnerService.postData("addPartners",this.addPartnerForm.value).subscribe((res:any)=>{
      if(res.status="success"){
        this.snackbar.showMessage(res.message,'Undo');
        this.route.navigate(['dashboard/partner'])
      }
    })
  }
  else{
    this.addPartnerForm.value.objectId=this.editPartner._id;
    this.addPartnerService.postData("editPartners",this.addPartnerForm.value).subscribe((res:any)=>{
      if(res.status="success"){
        this.snackbar.showMessage(res.message,'Undo')
        this.route.navigate(['dashboard/partner'])
      }
      this.getData();
      
    })
  }
  
 
}
getImages(){
  this.modalOpen=true;
  this.addPartnerService.getData("getPartnerImages").subscribe((res:any)=>{
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
selectedImage:any;

  uploadImage(){
    this.selectedFile.forEach(obj => {
      const formData: FormData = new FormData();
      formData.append('file', obj,obj.name);
      this.addPartnerService.postData("uploadPartnerImages"
        ,formData).subscribe((res:any)=>{
        console.log("upload image",res);
      })
    });
    
  }
  getData(){
    let jsonOBJ=JSON.parse(localStorage.getItem('editPartner'));
    let data={
      objectId:this.queryParams
    }
    this.addPartnerService.postData("getPartnerDetails",data).subscribe((res:any)=>{
      this.editPartner=res;
      this.setFormvalue();
    })
    
  }
  setFormvalue(){
    this.addPartnerForm.patchValue({
      active:this.editPartner.active=="on" ? true: false,
      image1:this.editPartner.image1,
      partner_name:this.editPartner.partner_name,
      link:this.editPartner.link
    })
  }
  
  attachImage(obj){
    
    this.addPartnerForm.patchValue({
      image1:obj.path
    })
    this.modalOpen=false;
  }
Cancel(){
  this.route.navigate(['dashboard/partner'])
}
}

