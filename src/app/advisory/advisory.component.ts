import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AdvisoryService } from '../sharedApi/advisory.service';
import { SnackbarService } from '../sharedApi/snackbar.service';

@Component({
  selector: 'app-advisory',
  templateUrl: './advisory.component.html',
  styleUrls: ['./advisory.component.scss']
})
export class AdvisoryComponent implements OnInit {

  constructor(private fb:FormBuilder,private advisorService:AdvisoryService,private snackbar:SnackbarService) { }
  advisorFormObject:any;
  Loader=true;
  ngOnInit(): void {
    this.getData();
  }
  responseMsg:any;
  advisoryForm=this.fb.group({
    person1:[''],
    person1_description:[''],
    person2:[''] ,
    person2_description:[''],  
    person3:[''] ,
    person3_description:[''] ,
    person4:[''] ,
    person4_description:[''], 
    titletext:[''] ,
     updatedDate:['']     
  })
getData(){
  let data={
    collection:"advisory"
}
this.advisorService.postData("getProductList",data).subscribe((res:any)=>{
  this.advisorFormObject=res[0];
  this.Loader=false;
  this.setFormValue();
})
}
setFormValue(){
  this.advisoryForm.patchValue({
    person1:this.advisorFormObject.person1,
    person1_description:this.advisorFormObject.person1_description,
    person2:this.advisorFormObject.person2,
    person2_description:this.advisorFormObject.person2_description,
    person3:this.advisorFormObject.person3,
    person3_description:this.advisorFormObject.person3_description,
    person4:this.advisorFormObject.person4,
    person4_description:this.advisorFormObject.person4_description,
    titletext:this.advisorFormObject.titletext,
     updatedDate:this.advisorFormObject.updatedDate
  })
}

onSubmit(){
  this.advisoryForm.value.objectId=this.advisorFormObject._id;
  this.advisoryForm.value.collection="advisory"
  this.advisorService.postData("updateProductData",this.advisoryForm.value).subscribe((res:any)=>{
    if(res.status="success"){
      this.responseMsg=res.message;
      this.snackbar.showMessage(this.responseMsg,'Undo')
    }
  })
}
}
