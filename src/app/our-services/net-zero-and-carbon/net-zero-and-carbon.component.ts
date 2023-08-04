import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { OurServicesService } from 'src/app/sharedApi/our-services.service';
import { SnackbarService } from 'src/app/sharedApi/snackbar.service';

@Component({
  selector: 'app-net-zero-and-carbon',
  templateUrl: './net-zero-and-carbon.component.html',
  styleUrls: ['./net-zero-and-carbon.component.scss']
})
export class NetZeroAndCarbonComponent implements OnInit {

  netZeroAndCarbonObj: any;
  encodedText1: any;
  encodedText2: any;
  encodedText3: any;
  encodedText4: any;
  encodedText5: any;
  responseMsg: any;

  constructor(private fb: FormBuilder, private zeroAndCarbonService: OurServicesService, private snackbar: SnackbarService) { }

  ngOnInit(): void {
    this.getData();
  }

  zeroAndCarbonForm = this.fb.group({
    text1: [''],
    txtEditor1: [''],
    txtEditor2: [''],
    txtEditor3: [''],
    txtEditor4: [''],
    txtEditor5: [''],
  })


  onSubmit() {
    this.zeroAndCarbonForm.value.objectId = this.netZeroAndCarbonObj._id;
    this.zeroAndCarbonService.postZeroAndCarbonData(this.zeroAndCarbonForm.value).subscribe((res: any) => {
      this.getData();
      if (res.status = "success") {
        this.responseMsg = res.message;
        this.snackbar.showMessage(this.responseMsg, 'Undo')
      }
    })
  }

  getData() {
    this.zeroAndCarbonService.getZeroAndCarbonData().subscribe((res: any) => {
      console.log('Zero And Carbon DATA', res);
      this.netZeroAndCarbonObj = res[0];
      this.encodedText1 = decodeURIComponent(this.netZeroAndCarbonObj.txtEditor1.replace(/%(?!\d+)/g, '%25'));
      this.encodedText2 = decodeURIComponent(this.netZeroAndCarbonObj.txtEditor2.replace(/%(?!\d+)/g, '%25'));
      this.encodedText3 = decodeURIComponent(this.netZeroAndCarbonObj.txtEditor3.replace(/%(?!\d+)/g, '%25'));
      this.encodedText4 = decodeURIComponent(this.netZeroAndCarbonObj.txtEditor4);
      this.encodedText5 = decodeURIComponent(this.netZeroAndCarbonObj.txtEditor5.replace(/%(?!\d+)/g, '%25'));
      this.setFormValue();

    },
      err => {
        console.log("err", err);

      })
  }

  setFormValue() {
    this.zeroAndCarbonForm.patchValue({
      text1: this.netZeroAndCarbonObj.text1,
      txtEditor1: this.encodedText1,
      txtEditor2: this.encodedText2,
      txtEditor3: this.encodedText3,
      txtEditor4: this.encodedText4,
      txtEditor5: this.encodedText5,
    });
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
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
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
    sanitize: false,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      // ['bold', 'italic'],
      // ['fontSize']
    ]
  };


}
