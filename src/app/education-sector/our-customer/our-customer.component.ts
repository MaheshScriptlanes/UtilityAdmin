import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EducationSectorService } from 'src/app/sharedApi/education-sector.service';

@Component({
  selector: 'app-our-customer',
  templateUrl: './our-customer.component.html',
  styleUrls: ['./our-customer.component.scss']
})
export class OurCustomerComponent implements OnInit {

  ourCustomerObj: any;
  constructor(private ourCustomerService: EducationSectorService, private route: Router) { }
  ngOnInit(): void {
    this.getData();
  }

  getData() {
    let data = {
      collection: "products"
    }
    this.ourCustomerService.getOurCustomerData().subscribe((res: any) => {
      this.ourCustomerObj = res;
      console.log("OUR Customer DATA", this.ourCustomerObj);

      // this.productObject.sort((a, b) => parseFloat(a.order) - parseFloat(b.order));
    })
  }
  editTeamMember(obj) {
    this.route.navigate(['dashboard/addreview'], { queryParams: { objectId: obj._id } });
  }
  addTeamMember() {
    this.route.navigate(["dashboard/addreview"])
  }

}
