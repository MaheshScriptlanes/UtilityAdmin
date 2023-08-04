import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { OurServicesService } from 'src/app/sharedApi/our-services.service';
import { SnackbarService } from 'src/app/sharedApi/snackbar.service';

@Component({
  selector: 'app-energy-procurement',
  templateUrl: './energy-procurement.component.html',
  styleUrls: ['./energy-procurement.component.scss']
})
export class EnergyProcurementComponent implements OnInit {

  energyProcurementObj: any;
  responseMsg: any;

  constructor(private fb: FormBuilder, private energyProcurementService: OurServicesService, private snackbar: SnackbarService) { }

  ngOnInit(): void {
    this.getData();
  }


  energyProcurementForm = this.fb.group({
    titletext: [''],
    text1: [''],
    text2: [''],
    text3: [''],


  })


  onSubmit() {
    this.energyProcurementForm.value.collection = "whyua";
    this.energyProcurementForm.value.objectId = this.energyProcurementObj._id;
    this.energyProcurementService.postEnergyProcurementData(this.energyProcurementForm.value).subscribe((res: any) => {
      this.getData();
      if (res.status = "success") {
        this.responseMsg = res.message;
        this.snackbar.showMessage(this.responseMsg, 'Undo')
      }
    })
  }

  getData() {
    let data = {
      collection: "whyua"
    }
    this.energyProcurementService.getEnergyProcurementData(data).subscribe((res: any) => {
      console.log('Enengy Procurement DATA', res);
      this.energyProcurementObj = res[0];
      this.setFormValue();

    },
      err => {
        console.log("err", err);

      })
  }

  setFormValue() {
    this.energyProcurementForm.patchValue({
      titletext: this.energyProcurementObj.titletext,
      text1: this.energyProcurementObj.text1,
      text2: this.energyProcurementObj.text2,
      text3: this.energyProcurementObj.text3,
    });
  }

}
