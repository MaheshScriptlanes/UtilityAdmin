import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { SnackbarService } from '../sharedApi/snackbar.service';
import { CharityTenderService } from '../sharedApi/charity-tender.service';

@Component({
  selector: 'app-charity-tender',
  templateUrl: './charity-tender.component.html',
  styleUrls: ['./charity-tender.component.scss']
})
export class CharityTenderComponent implements OnInit {

  charityTenderObj: any;
  encodedText: any;
  responseMsg: any;

  constructor(private fb: FormBuilder, private charityTenderService: CharityTenderService, private snackbar: SnackbarService) { }

  ngOnInit(): void {
    this.getData();
  }


  charityTenderForm = this.fb.group({
    text1: [''],
    text2: [''],
    text3: [''],
    text4: [''],

  })


  onSubmit() {
    this.charityTenderForm.value.objectId = this.charityTenderObj._id;
    this.charityTenderService.postCharityTenderData(this.charityTenderForm.value).subscribe((res: any) => {
      this.getData();
      if (res.status = "success") {
        this.responseMsg = res.message;
        this.snackbar.showMessage(this.responseMsg, 'Undo')
      }
    })
  }

  getData() {
    this.charityTenderService.getCharityTenderData().subscribe((res: any) => {
      console.log('Charity Tender DATA', res);
      this.charityTenderObj = res[0];
      this.encodedText = decodeURIComponent(this.charityTenderObj.text4.replace(/%(?!\d+)/g, '%25'));
      this.setFormValue();

    },
      err => {
        console.log("err", err);

      })
  }

  setFormValue() {
    this.charityTenderForm.patchValue({
      text1: this.charityTenderObj.text1,
      text2: this.charityTenderObj.text2,
      text3: this.charityTenderObj.text3,
      text4: this.encodedText,

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
