import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ContactListService } from 'src/app/sharedApi/contact-list.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SnackbarService } from 'src/app/sharedApi/snackbar.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit {

  constructor(private fb:FormBuilder,private editContactService:ContactListService,private route:Router,private activateRoute:ActivatedRoute,
    private snackbar:SnackbarService) {
    activateRoute.queryParams.subscribe((res:any)=>{
      this.queryParams=res.objectId;
    })
   }

  ngOnInit(): void {
  this.getData();
  }
  queryParams:any;
  editContactObject:any;
  editContactForm=this.fb.group({
address:[''],
collection:[''],
location:[''],
mail: [''],
phone:[''],
title:[''],
updatedDate:['']
  })
getData(){

  let data={
    objectId:this.queryParams
  }
  this.editContactService.showData('getContactData',data).subscribe((res:any)=>{
    this.editContactObject=res;
    this.setFormValue();
  })
}
setFormValue(){
  this.editContactForm.patchValue({
    address:this.editContactObject.address,
collection:this.editContactObject.collection,
location:this.editContactObject.location,
mail:this.editContactObject.mail,
phone:this.editContactObject.phone,
title:this.editContactObject.title,
updatedDate:this.editContactObject.updatedDate
  })
}
onSubmit(){
  this.editContactForm.value.objectId=this.editContactObject._id;
  
  this.editContactService.showData('updateProductData',this.editContactForm.value).subscribe((res:any)=>{
    if(res.status="success"){
      this.snackbar.showMessage(res.message,'Undo')
      this.route.navigate(['dashboard/contact'])
    }

  })
}
Cancel(){
  this.route.navigate(['dashboard/contact'])
}
}
