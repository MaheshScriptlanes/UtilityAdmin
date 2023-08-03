import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { WhyUaService } from 'src/app/sharedApi/why-ua.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SnackbarService } from 'src/app/sharedApi/snackbar.service';

@Component({
  selector: 'app-edit-author',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.scss']
})
export class EditAuthorComponent implements OnInit {

  constructor(private fb: FormBuilder, private whyService: WhyUaService, private route: Router, private activateRoute: ActivatedRoute, private snackbar: SnackbarService) {
    activateRoute.queryParams.subscribe((res: any) => {
      this.queryParams = res.objectId;
    });
  }

  ngOnInit(): void {
    this.getData();
  }
  checkedValue: string;
  modalOpen = false;
  imageLoader = true;
  queryParams: any;
  selectedImage: any;
  IsHidden = true;
  baseUrl: any = environment.baseurl;
  backGroundImage: any;
  editAuthorObject: any;
  editAuthorForm = this.fb.group({
    active:[''],
    bio: [''],
    first_name: [''],
    identifier: [''],
    image1: [''],
    last_name: [''],
    order_id: [Validators.pattern("^[0-9]*$")]
  })

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
    this.editAuthorForm.patchValue({
      active: this.editAuthorObject.active=="on" ? true: false,
      bio: this.editAuthorObject.bio,
      first_name: this.editAuthorObject.first_name,
      identifier: this.editAuthorObject.identifier,
      image1: this.editAuthorObject.image1,
      last_name: this.editAuthorObject.last_name,
      order_id: this.editAuthorObject.order_id
    })
  }
  onSubmit() {
    if(this.editAuthorForm.value.active == true){
      this.editAuthorForm.value.active = "on";
    }
    else{
      this.editAuthorForm.value.active = "off";
    }
    this.editAuthorForm.value.objectId = this.editAuthorObject._id;
    this.whyService.postData('editAuthor', this.editAuthorForm.value).subscribe((res: any) => {
      if (res.status = "success") {
        this.snackbar.showMessage(res.message, 'Undo');
        this.route.navigate(["dashboard/authors"]);
      }
      this.getData();

    })

  }
  Cancel() {
    this.route.navigate(["dashboard/authors"]);
  }
  getImages() {
    this.modalOpen = true;
    this.whyService.getData("getAuthorImages").subscribe((res: any) => {
      if (res[0].status == "success") {
        this.imageLoader = false;
      }
      this.backGroundImage = res;
    })
  }
  selectedFile: any;
  files: any = [];

  uploadFile(event) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.files.push(element)
      this.selectedFile = <File>this.files;
      this.uploadImage();
      this.getImages();

    }
  }
  uploadImage() {
    this.selectedFile.forEach(obj => {
      const formData: FormData = new FormData();
      formData.append('file', obj, obj.name);
      this.whyService.postData("uploadAuthorImages", formData).subscribe((res: any) => {
      })
    });

  }
  attachImage(obj) {
    this.editAuthorForm.patchValue({
      image1:obj.path
    })
    this.modalOpen = false;

  }

  loadImage() {
    this.IsHidden = true;
    this.IsHidden = !this.IsHidden;
  }



}
