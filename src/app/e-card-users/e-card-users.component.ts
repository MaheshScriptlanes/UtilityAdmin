import { Component, OnInit } from '@angular/core';
import { EcardUserService } from '../sharedApi/ecard-user.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SnackbarService } from '../sharedApi/snackbar.service';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-e-card-users',
  templateUrl: './e-card-users.component.html',
  styleUrls: ['./e-card-users.component.scss']
})
export class ECardUsersComponent implements OnInit {

  baseUrl: any = environment.baseurl;
  modalOpen = false;
  qrModalOpen = false;
  qrData: any
  deleteName: any;
  ecardUserObj: any;
  deleteData: any;

  constructor(private ecardService: EcardUserService, private route: Router, private snackbar: SnackbarService) { }
  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.ecardService.getEcardUserData().subscribe((res: any) => {
      this.ecardUserObj = res;
      console.log("E Card DATA", this.ecardUserObj);

      // this.productObject.sort((a, b) => parseFloat(a.order) - parseFloat(b.order));
    })
  }

  viewQR(obj) {
    this.qrData = obj;
    this.qrModalOpen = true;
  }

  downloadQR() {
    let section: any = document.querySelector('#screen');

    html2canvas(section).then(canvas => {
      var link = document.createElement('a');
      link.href = canvas.toDataURL();
      link.download = this.qrData.slug + '.png';
      document.body.appendChild(link);
      link.click();
    });
  }

  editEcardUser(obj) {
    this.route.navigate(['dashboard/addecarduser'], { queryParams: { objectId: obj._id } });
  }
  addEcardUser() {
    this.route.navigate(["dashboard/addecarduser"])
  }

  deleteEcardUser(obj) {
    this.deleteData = obj;
    this.deleteName = obj.name;
    this.modalOpen = true;
  }

  deleteEntry() {
    this.ecardService.deleteEcardUserData(this.deleteData).subscribe((res: any) => {
      this.snackbar.showMessage("Data Deleted Successfully", 'Undo');
      this.getData();
    },
      err => {
        console.log("ERROR", err);

      })
  }

}
