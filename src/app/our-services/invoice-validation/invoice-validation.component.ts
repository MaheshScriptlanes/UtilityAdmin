import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { SnackbarService } from '../../sharedApi/snackbar.service';
import { OurServicesService } from 'src/app/sharedApi/our-services.service';

@Component({
  selector: 'app-invoice-validation',
  templateUrl: './invoice-validation.component.html',
  styleUrls: ['./invoice-validation.component.scss']
})
export class InvoiceValidationComponent implements OnInit {

  invoiceObj: any;
  encodedText1: any;
  encodedText2: any;
  encodedText3: any;
  encodedText4: any;
  encodedText5: any;
  responseMsg: any;

  constructor(private fb: FormBuilder, private invoiceService: OurServicesService, private snackbar: SnackbarService) { }

  ngOnInit(): void {
    this.getData();
  }

  invoiceValidationForm = this.fb.group({
    header: [''],
    text1: [''],
    text2: [''],
    text3: [''],
    txtEditor1: [''],
    txtEditor2: [''],
    txtEditor3: [''],
    txtEditor4: [''],
    txtEditor5: [''],
  })
  onSubmit() {
    this.invoiceValidationForm.value.objectId = this.invoiceObj._id;
    this.invoiceService.postInvoiceValidationData(this.invoiceValidationForm.value).subscribe((res: any) => {
      this.getData();
      if (res.status = "success") {
        this.responseMsg = res.message;
        this.snackbar.showMessage(this.responseMsg, 'Undo')
      }
    })
  }

  getData() {
    this.invoiceService.getInvoiceValidationData().subscribe((res: any) => {
      console.log('INVOICE VALIDATION DATA', res);
      this.invoiceObj = res[0];
      this.encodedText1 = decodeURIComponent(this.invoiceObj.txtEditor1.replace(/%(?!\d+)/g, '%25'));
      this.encodedText2 = decodeURIComponent(this.invoiceObj.txtEditor2.replace(/%(?!\d+)/g, '%25'));
      this.encodedText3 = decodeURIComponent(this.invoiceObj.txtEditor3.replace(/%(?!\d+)/g, '%25'));
      this.encodedText4 = decodeURIComponent(this.invoiceObj.txtEditor4.replace(/%(?!\d+)/g, '%25'));
      this.encodedText5 = decodeURIComponent(this.invoiceObj.txtEditor5.replace(/%(?!\d+)/g, '%25'));
      this.setFormValue();

    },
      err => {
        console.log("err", err);

      })
  }

  setFormValue() {
    this.invoiceValidationForm.patchValue({
      header: this.invoiceObj.header,
      text1: this.invoiceObj.text1,
      text2: this.invoiceObj.text2,
      text3: this.invoiceObj.text3,
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
