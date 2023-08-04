import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SnackbarService } from '../sharedApi/snackbar.service';
import { EducationSectorService } from '../sharedApi/education-sector.service';

@Component({
  selector: 'app-education-sector',
  templateUrl: './education-sector.component.html',
  styleUrls: ['./education-sector.component.scss']
})
export class EducationSectorComponent implements OnInit {

  educationSectorObj: any;
  responseMsg: any;

  constructor(private fb: FormBuilder, private educationSectorService: EducationSectorService, private snackbar: SnackbarService) { }

  ngOnInit(): void {
    this.getData();
  }


  educationSectorForm = this.fb.group({
    text1: [''],
    text2: [''],
    text3: [''],


  })


  onSubmit() {
    this.educationSectorForm.value.objectId = this.educationSectorObj._id;
    this.educationSectorService.postEducationSectorData(this.educationSectorForm.value).subscribe((res: any) => {
      this.getData();
      if (res.status = "success") {
        this.responseMsg = res.message;
        this.snackbar.showMessage(this.responseMsg, 'Undo')
      }
    })
  }

  getData() {

    this.educationSectorService.getEducationSectorData().subscribe((res: any) => {
      console.log('Education Sector DATA', res);
      this.educationSectorObj = res[0];
      this.setFormValue();

    },
      err => {
        console.log("err", err);

      })
  }

  setFormValue() {
    this.educationSectorForm.patchValue({
      text1: this.educationSectorObj.text1,
      text2: this.educationSectorObj.text2,
      text3: this.educationSectorObj.text3,
    });
  }
}
