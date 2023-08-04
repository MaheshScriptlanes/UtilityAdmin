import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdvisoryService } from 'src/app/sharedApi/advisory.service';
import { SnackbarService } from 'src/app/sharedApi/snackbar.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-team-member',
  templateUrl: './add-team-member.component.html',
  styleUrls: ['./add-team-member.component.scss']
})
export class AddTeamMemberComponent implements OnInit {

  baseUrl: any = environment.baseurl;
  queryParams: any;
  editTeamObject: any;
  selectedFile: any;
  files: any = [];
  Loader = true;
  previewImage: any;
  constructor(private route: Router,
    private fb: FormBuilder,
    private activateRoute: ActivatedRoute,
    private ourTeamService: AdvisoryService,
    private snackbar: SnackbarService) {
    activateRoute.queryParams.subscribe((res: any) => {
      this.queryParams = res.objectId;
    })
  }

  ourTeamForm = this.fb.group({
    active: [false],
    name: [''],
    heading: [''],
    image: ['']
  })

  ngOnInit(): void {
    this.getData();
  }
  onSubmit() {
    // this.newsForm.value.active = true ? 'on' : 'off';
    if (this.ourTeamForm.value.active == true) {
      this.ourTeamForm.value.active = "on";
    }
    else {
      this.ourTeamForm.value.active = "off";
    }
    if (!this.queryParams) {
      this.ourTeamService.addOurTeamPageData(this.ourTeamForm.value).subscribe((res: any) => {
        if (res.status = "success") {
          this.snackbar.showMessage(res.message, 'Undo');
          this.route.navigate(['dashboard/ourteam']);
        }
      })
    } else {
      this.ourTeamForm.value.objectId = this.editTeamObject._id;
      this.ourTeamService.editOurTeamPageData(this.ourTeamForm.value).subscribe((res: any) => {
        if (res.status = "success") {
          this.snackbar.showMessage(res.message, 'Undo')
          this.route.navigate(['dashboard/ourteam']);
        }
        this.getData();
      })
    }
  }

  getData() {
    let data = {
      objectId: this.queryParams
    }
    this.ourTeamService.getSingleOurTeamPageData(data).subscribe((res: any) => {
      this.editTeamObject = res;
      this.Loader = false;
      this.setFormValue();
    })
  }


  setFormValue() {
    this.ourTeamForm.patchValue({
      active: this.editTeamObject.active == "on" ? true : false,
      name: this.editTeamObject.name,
      heading: this.editTeamObject.heading,
      image: this.editTeamObject.image
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
      this.ourTeamService.uploadImages("uploadUANewsPhoto", formData, { responseType: 'text' as 'json' }).subscribe((res: any) => {
        console.log("upload image", res);
        this.previewImage = res;
        this.ourTeamForm.patchValue({
          image: this.previewImage
        })
      })
    });

  }



  Cancel() {
    this.route.navigate(['dashboard/ourteam']);
  }

}
