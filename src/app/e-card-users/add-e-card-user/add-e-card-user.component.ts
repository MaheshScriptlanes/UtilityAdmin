import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EcardUserService } from 'src/app/sharedApi/ecard-user.service';
import { SnackbarService } from 'src/app/sharedApi/snackbar.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-e-card-user',
  templateUrl: './add-e-card-user.component.html',
  styleUrls: ['./add-e-card-user.component.scss']
})
export class AddECardUserComponent implements OnInit {

  baseUrl: any = environment.baseurl;
  queryParams: any;
  editEcardUserObject: any;
  selectedFile: any;
  files: any = [];
  Loader = true;
  previewImage: any;
  constructor(private route: Router,
    private fb: FormBuilder,
    private activateRoute: ActivatedRoute,
    private ecardUserService: EcardUserService,
    private snackbar: SnackbarService) {
    activateRoute.queryParams.subscribe((res: any) => {
      this.queryParams = res.objectId;
    })
  }

  ecardUserForm = this.fb.group({
    active: [false],
    name: [''],
    title: [''],
    mobile: [''],
    email: [''],
    address: [''],
    profilePic: [''],
    qrCode:[''],
    slug:['']
  })

  ngOnInit(): void {
    this.getData();
  }
  onSubmit() {
    // this.newsForm.value.active = true ? 'on' : 'off';
    if (this.ecardUserForm.value.active == true) {
      this.ecardUserForm.value.active = "on";
    }
    else {
      this.ecardUserForm.value.active = "off";
    }
    if (!this.queryParams) {
      this.ecardUserService.addEcardUserData(this.ecardUserForm.value).subscribe((res: any) => {
        if (res.status = "success") {
          this.snackbar.showMessage("Data Added Successfully", 'Undo');
          this.route.navigate(['dashboard/ecarduser']);
        }
      })
    } else {
      this.ecardUserForm.value.objectId = this.editEcardUserObject._id;
      this.ecardUserService.editEcardUserData(this.ecardUserForm.value).subscribe((res: any) => {
        if (res.status = "success") {
          this.snackbar.showMessage("Data Updated Successfully", 'Undo')
          this.route.navigate(['dashboard/ecarduser']);
        }
        // this.getData();
      })
    }
  }

  getData() {
    let data = {
      objectId: this.queryParams
    }
    this.ecardUserService.getEcardUserDataById(data).subscribe((res: any) => {
      this.editEcardUserObject = res;
      this.Loader = false;
      this.setFormValue();
    })
  }


  setFormValue() {
    this.ecardUserForm.patchValue({
      active: this.editEcardUserObject.active == "on" ? true : false,
      name: this.editEcardUserObject.name,
      title: this.editEcardUserObject.title,
      mobile: this.editEcardUserObject.mobile,
      email: this.editEcardUserObject.email,
      address: this.editEcardUserObject.address,
      profilePic: this.editEcardUserObject.profilePic,
      slug : this.editEcardUserObject.slug,
      qrCode : this.editEcardUserObject.qrCode
    })
  }

  uploadFile(event) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.files.push(element)
      this.selectedFile = <File>this.files;
      this.uploadImage();
    }
  }
  uploadImage() {
    this.selectedFile.forEach(obj => {
      const formData: FormData = new FormData();
      formData.append('file', obj, obj.name);
      this.ecardUserService.uploadImages("uploadUANewsPhoto", formData, { responseType: 'text' as 'json' }).subscribe((res: any) => {
        console.log("upload image", res);
        this.previewImage = res;
        this.ecardUserForm.patchValue({
          image: this.previewImage
        })
      })
    });

  }



  Cancel() {
    this.route.navigate(['dashboard/ecarduser']);
  }

}
