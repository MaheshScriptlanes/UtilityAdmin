import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdvisoryService } from 'src/app/sharedApi/advisory.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-our-team',
  templateUrl: './our-team.component.html',
  styleUrls: ['./our-team.component.scss']
})
export class OurTeamComponent implements OnInit {

  baseUrl:any=environment.baseurl;
  teamMemberObj: any;
  constructor(private ourTeamService: AdvisoryService, private route: Router) { }
  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.ourTeamService.getOurTeamPageData().subscribe((res: any) => {
      this.teamMemberObj = res;
      console.log("TEAM MEMBER DATA", this.teamMemberObj);

      // this.productObject.sort((a, b) => parseFloat(a.order) - parseFloat(b.order));
    })
  }
  editTeamMember(obj) {
    this.route.navigate(['dashboard/addteam'], { queryParams: { objectId: obj._id } });
  }
  addTeamMember() {
    this.route.navigate(["dashboard/addteam"])
  }

}
