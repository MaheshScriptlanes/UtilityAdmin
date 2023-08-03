import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WhyUaService } from '../sharedApi/why-ua.service';
import { FormBuilder } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { environment } from 'src/environments/environment';
import { DateFormatPipe } from '../date-format.pipe';
import { SnackbarService } from '../sharedApi/snackbar.service';
import { DateTwoFormatPipe } from '../date-two-format.pipe';
@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.scss']
})
export class EditBlogComponent implements OnInit {
  
  constructor(private apiSer:WhyUaService,private activateRoute:ActivatedRoute,  private fb:FormBuilder,private route:Router,private datePipe:DateFormatPipe,private snackbar:SnackbarService,private dateTwo:DateTwoFormatPipe) {
    activateRoute.queryParams.subscribe((res:any)=>{
      this.queryParams=res.objectId;
    })
   }
  ngOnInit(): void {
    this.getAuthorlist();
    this.getData();
    }
  
    editorText:any;
    convertedDate=new Date();
    modalOpen=false;
    imageLoader=true;
    authorSelected:any
    selectedAuthor:any;
    authorList:any;
    queryParams:any;
    selectedImage:any;
    myDate:any;
    IsHidden= true;
    baseUrl:any=environment.baseurl;
    backGroundImage:any;
    blogForm:any;
    editBlogForm=this.fb.group({
      active:[''],
      author:[''],
      display_title:[''],
      editor1:[''],
      image1:[''],
      meta_data_meta_description:[''],
      meta_data_meta_title:[''],
      page_content_excerpt:[''],
      page_content_extended_title:[''],
      publish_date_0:[''],
      slug:[''],
      thumbImage:[''],
      title:[''],
      
    })
    getData(){
      let data={
        objectId:this.queryParams
      }
      this.apiSer.postData("getBlogDetails",data).subscribe((res:any)=>{
        this.blogForm=res;
        var reStr = 'utilityAid/images';
        this.editorText= this.blogForm.editor1.replace(new RegExp(reStr, 'g'),this.baseUrl+'utilityAid/images');
        console.log("data in text4",this.editorText);
        this.setFormValue();
       
      })  
    }
    getAuthorlist(){
      this.apiSer.getData('getAuthorList').subscribe((res:any)=>{
        this.authorList=res;
      })
    }
    setFormValue(){
     this.editBlogForm.patchValue({
        display_title:this.blogForm.display_title,
        // publish_date_0:this.datePipe.transform(this.myDate),
        // publish_date_0:this.myDate,
        // publish_date_0:new Date( this.blogForm.publish_date_0),
        publish_date_0:this.dateTwo.transform(this.blogForm.publish_date_0),
        title:this.blogForm.title,
        slug:this.blogForm.slug,
        page_content_extended_title:this.blogForm.page_content_extended_title,
        page_content_excerpt:this.blogForm.page_content_excerpt,
        editor1:this.editorText,
        meta_data_meta_title:this.blogForm.meta_data_meta_title,
        meta_data_meta_description:this.blogForm.meta_data_meta_description,
        active:this.blogForm.active=="on" ? true: false,
        image1:this.blogForm.image1,
        thumbImage:this.blogForm.thumbImage,
        author:this.blogForm.author
      })
  }
    onSubmit(){
      if(this.editBlogForm.value.active == true){
        this.editBlogForm.value.active = "on";
      }
      else{
        this.editBlogForm.value.active = "off";
      }
    this.editBlogForm.value.objectId=this.blogForm._id;
    this.editBlogForm.value.publish_date_0=this.datePipe.transform(this.editBlogForm.value.publish_date_0);
      this.apiSer.postData("editBlog",this.editBlogForm.value).subscribe((res:any)=>{
        if(res.status="success"){
          this.snackbar.showMessage(res.message,'Undo')
          this.route.navigate(["dashboard/blogs"]);
        }
        
     
        // if(res.status=="success"){
      
        // }
       this.getData()
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
        this.apiSer.postData("uploadBackgroundImages",formData).subscribe((res:any)=>{
          console.log("upload image",res);
        })
      });
      
    }
    getImages(){
      this.modalOpen=true;
      this.apiSer.getData("getBackgroundImages").subscribe((res:any)=>{
        // console.log("response from background image",res);
        if(res[0].status=="success"){
         this.imageLoader=false; 
        }
        this.backGroundImage=res;

      })
    }
    attachImage(obj){ 
      this.editBlogForm.patchValue({
        image1:obj.path,
        
      })
      this.modalOpen=false;
    }
   
  loadImage(){
    this.IsHidden=true;
    this.IsHidden= !this.IsHidden;
  }

  Cancel(){
    this.route.navigate(['dashboard/blogs'])
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
    sanitize:false,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
     
    ]
};
checkedList = []

// onCheckboxChange(option, event) {
//   // console.log('option', option)
//      if(event.target.checked) {
//        this.checkedList.push(option._id)
//      } else {
//      for(var i=0 ; i < this.checkedList.length; i++) {
//        if(this.checkedList[i] == option._id) {
//          this.checkedList.splice(i,1);
//       }
//     }
    
//   }
//   console.log("value in checklist",this.checkedList);
//   this.checkedList.forEach(obj=>{
//     this.selectedAuthor=obj;
//   })
//   console.log("data after array reverse",this.selectedAuthor)

// }
}

