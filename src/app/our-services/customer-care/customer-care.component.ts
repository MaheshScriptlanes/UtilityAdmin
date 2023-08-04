import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { OurServicesService } from 'src/app/sharedApi/our-services.service';
import { SnackbarService } from 'src/app/sharedApi/snackbar.service';

@Component({
  selector: 'app-customer-care',
  templateUrl: './customer-care.component.html',
  styleUrls: ['./customer-care.component.scss']
})
export class CustomerCareComponent implements OnInit {

  customerCareObj: any;
  encodedText1: any;
  responseMsg: any;

  constructor(private fb: FormBuilder, private voidManagementService: OurServicesService, private snackbar: SnackbarService) { }

  ngOnInit(): void {
    this.getData();
  }


  customerCareForm = this.fb.group({
    text1: [''],
    txtEditor1: [''],

  })


  onSubmit() {
    this.customerCareForm.value.objectId = this.customerCareObj._id;
    this.voidManagementService.postCustomerCareData(this.customerCareForm.value).subscribe((res: any) => {
      this.getData();
      if (res.status = "success") {
        this.responseMsg = res.message;
        this.snackbar.showMessage(this.responseMsg, 'Undo')
      }
    })
  }

  getData() {
    this.voidManagementService.getCustomerCareData().subscribe((res: any) => {
      console.log('Customer Care DATA', res);
      this.customerCareObj = res[0];
      this.encodedText1 = decodeURIComponent(this.customerCareObj.txtEditor1.replace(/%(?!\d+)/g, '%25'));
      this.setFormValue();

    },
      err => {
        console.log("err", err);

      })
  }

  setFormValue() {
    this.customerCareForm.patchValue({
      text1: this.customerCareObj.text1,
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
