import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { OurServicesService } from 'src/app/sharedApi/our-services.service';
import { SnackbarService } from 'src/app/sharedApi/snackbar.service';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.scss']
})
export class AccountManagementComponent implements OnInit {


  accountManagementObj: any;
  encodedText1: any;
  responseMsg: any;

  constructor(private fb: FormBuilder, private accountManagementService: OurServicesService, private snackbar: SnackbarService) { }

  ngOnInit(): void {
    this.getData();
  }


  accountManagementForm = this.fb.group({
    txtEditor1: [''],

  })


  onSubmit() {
    this.accountManagementForm.value.objectId = this.accountManagementObj._id;
    this.accountManagementService.postAccountManagementData(this.accountManagementForm.value).subscribe((res: any) => {
      this.getData();
      if (res.status = "success") {
        this.responseMsg = res.message;
        this.snackbar.showMessage(this.responseMsg, 'Undo')
      }
    })
  }

  getData() {
    this.accountManagementService.getAccountManagementData().subscribe((res: any) => {
      console.log('Account Management DATA', res);
      this.accountManagementObj = res[0];
      this.encodedText1 = decodeURIComponent(this.accountManagementObj.txtEditor1);
      this.setFormValue();

    },
      err => {
        console.log("err", err);

      })
  }

  setFormValue() {
    this.accountManagementForm.patchValue({
      txtEditor1: this.encodedText1
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
