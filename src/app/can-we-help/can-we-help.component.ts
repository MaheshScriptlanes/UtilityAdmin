import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { CanWeHelpService } from '../sharedApi/can-we-help.service';
import { SnackbarService } from '../sharedApi/snackbar.service';

@Component({
  selector: 'app-can-we-help',
  templateUrl: './can-we-help.component.html',
  styleUrls: ['./can-we-help.component.scss']
})
export class CanWeHelpComponent implements OnInit {


  canWeHelpObj: any;
  responseMsg: any;

  constructor(private fb: FormBuilder, private canWeHelpService: CanWeHelpService, private snackbar: SnackbarService) { }

  ngOnInit(): void {
    this.getData();
  }

  canWeHelpForm = this.fb.group({
    header1: ['', [Validators.required, charLengthValidator(22)]],
    header2: ['', [Validators.required, charLengthValidator(22)]],
    point1: ['', [Validators.required, charLengthValidator(160)]],
    point2: ['', [Validators.required, charLengthValidator(160)]],
    point3: ['', [Validators.required, charLengthValidator(160)]],
    point4: ['', [Validators.required, charLengthValidator(160)]],
    point5: ['', [Validators.required, charLengthValidator(160)]],
    point6: ['', [Validators.required, charLengthValidator(160)]],
    point7: ['', [Validators.required, charLengthValidator(160)]],
    point8: ['', [Validators.required, charLengthValidator(160)]],
    formValue1: ['', [Validators.required, charLengthValidator(35)]],
    formValue2: ['', [Validators.required, charLengthValidator(35)]],

  })


  onSubmit() {
    this.canWeHelpForm.value.objectId = this.canWeHelpObj._id;
    this.canWeHelpService.editCanweHelpData(this.canWeHelpForm.value).subscribe((res: any) => {
      this.getData();
      if (res.status = "success") {
        this.responseMsg = res.message;
        this.snackbar.showMessage(this.responseMsg, 'Undo')
      }
    })
  }

  getData() {
    this.canWeHelpService.getCanweHelpData().subscribe((res: any) => {
      console.log('Can We Help DATA', res);
      this.canWeHelpObj = res[0];
      this.setFormValue();

    },
      err => {
        console.log("err", err);

      })
  }

  setFormValue() {
    this.canWeHelpForm.patchValue({
      header1: this.canWeHelpObj.header1,
      header2: this.canWeHelpObj.header2,
      point1: this.canWeHelpObj.point1,
      point2: this.canWeHelpObj.point2,
      point3: this.canWeHelpObj.point3,
      point4: this.canWeHelpObj.point4,
      point5: this.canWeHelpObj.point5,
      point6: this.canWeHelpObj.point6,
      point7: this.canWeHelpObj.point7,
      point8: this.canWeHelpObj.point8,
      formValue1: this.canWeHelpObj.formValue1,
      formValue2: this.canWeHelpObj.formValue2,

    });
  }


}

export function charLengthValidator(maxLength: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value && value.length > maxLength) {
      return { charLengthExceeded: true };
    }
    return null;
  };
}
