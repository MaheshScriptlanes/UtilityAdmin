import { Component, OnInit } from '@angular/core';
import { WhyUaService } from '../sharedApi/why-ua.service';
import { FormBuilder } from '@angular/forms';
import { SnackbarService } from '../sharedApi/snackbar.service';

@Component({
  selector: 'app-why-ua',
  templateUrl: './why-ua.component.html',
  styleUrls: ['./why-ua.component.scss']
})
export class WhyUaComponent implements OnInit {

  constructor(private whyUaservice:WhyUaService,private fb:FormBuilder,private snackbar:SnackbarService) { }
  ngOnInit(): void {
  this.getData();
  }
  whyUaform=this.fb.group({
    titletext:[''],
    text1:[''],
    text2:[''],
    text3:['']
  })
  whyuaForm:any;
  getData(){
    let data={
      collection:"whyua"
    }
    this.whyUaservice.postData("getProductList",data).subscribe((res:any)=>{
      console.log("data from whyau",res);
      this.whyuaForm=res[0];
      this.setFormValue();
    })
  }
  setFormValue(){
  this.whyUaform.patchValue({
    titletext:this.whyuaForm.titletext,
    text1:this.whyuaForm.text1,
    text2:this.whyuaForm.text2,
    text3:this.whyuaForm.text3

  })
  }
  responseMessage:any;
  onSubmit(){  
      this.whyUaform.value.collection="whyua",
      this.whyUaform.value.objectId=this.whyuaForm._id
      this.whyUaservice.postData("updateProductData",this.whyUaform.value).subscribe((res:any)=>{
        if(res.status=="success"){
          this.snackbar.showMessage(res.message,'Undo');
      
        }
       
    })
  }
}
