import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AdvisoryService } from 'src/app/sharedApi/advisory.service';
import { SnackbarService } from 'src/app/sharedApi/snackbar.service';

@Component({
  selector: 'app-our-heritage',
  templateUrl: './our-heritage.component.html',
  styleUrls: ['./our-heritage.component.scss']
})
export class OurHeritageComponent implements OnInit {

  ourHeritageObj: any;
  responseMsg: any;

  constructor(private fb: FormBuilder, private ourHeritageService: AdvisoryService, private snackbar: SnackbarService) { }

  ngOnInit(): void {
    this.getData();
  }


  ourHeritageForm = this.fb.group({
    text1: [''],
    text2: [''],
    text3: [''],


  })


  onSubmit() {
    this.ourHeritageForm.value.objectId = this.ourHeritageObj._id;
    this.ourHeritageService.postOurHeritageData(this.ourHeritageForm.value).subscribe((res: any) => {
      this.getData();
      if (res.status = "success") {
        this.responseMsg = res.message;
        this.snackbar.showMessage(this.responseMsg, 'Undo')
      }
    })
  }

  getData() {

    this.ourHeritageService.getOurHeritageData().subscribe((res: any) => {
      console.log('Our Heritage DATA', res);
      this.ourHeritageObj = res[0];
      this.setFormValue();

    },
      err => {
        console.log("err", err);

      })
  }

  setFormValue() {
    this.ourHeritageForm.patchValue({
      text1: this.ourHeritageObj.text1,
      text2: this.ourHeritageObj.text2,
      text3: this.ourHeritageObj.text3,
    });
  }
}
