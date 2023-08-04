import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { OurServicesService } from 'src/app/sharedApi/our-services.service';
import { SnackbarService } from 'src/app/sharedApi/snackbar.service';

@Component({
  selector: 'app-void-management',
  templateUrl: './void-management.component.html',
  styleUrls: ['./void-management.component.scss']
})
export class VoidManagementComponent implements OnInit {

  voidManagementObj: any;
  encodedText: any;
  encodedText1: any;
  encodedText2: any;
  responseMsg: any;

  constructor(private fb: FormBuilder, private voidManagementService: OurServicesService, private snackbar: SnackbarService) { }

  ngOnInit(): void {
    this.getData();
  }


  voidManagementForm = this.fb.group({
    text1: [''],
    txtEditor: [''],
    txtEditor1: [''],
    txtEditor2: [''],

  })


  onSubmit() {
    this.voidManagementForm.value.objectId = this.voidManagementObj._id;
    this.voidManagementService.postVoidManagementData(this.voidManagementForm.value).subscribe((res: any) => {
      this.getData();
      if (res.status = "success") {
        this.responseMsg = res.message;
        this.snackbar.showMessage(this.responseMsg, 'Undo')
      }
    })
  }

  getData() {
    this.voidManagementService.getVoidManagementData().subscribe((res: any) => {
      console.log('Void Management DATA', res);
      this.voidManagementObj = res[0];
      this.encodedText = decodeURIComponent(this.voidManagementObj.txtEditor.replace(/%(?!\d+)/g, '%25'));
      this.encodedText1 = decodeURIComponent(this.voidManagementObj.txtEditor1.replace(/%(?!\d+)/g, '%25'));
      this.encodedText2 = decodeURIComponent(this.voidManagementObj.txtEditor2.replace(/%(?!\d+)/g, '%25'));
      this.setFormValue();

    },
      err => {
        console.log("err", err);

      })
  }

  setFormValue() {
    this.voidManagementForm.patchValue({
      text1: this.voidManagementObj.text1,
      txtEditor: this.encodedText,
      txtEditor1: this.encodedText1,
      txtEditor2: this.encodedText2,
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
