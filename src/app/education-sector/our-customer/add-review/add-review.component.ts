import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EducationSectorService } from 'src/app/sharedApi/education-sector.service';
import { SnackbarService } from 'src/app/sharedApi/snackbar.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss']
})
export class AddReviewComponent implements OnInit {
  queryParams: any;
  editTeamObject: any;
  constructor(private route: Router,
    private fb: FormBuilder,
    private activateRoute: ActivatedRoute,
    private addReviewService: EducationSectorService,
    private snackbar: SnackbarService) {
    activateRoute.queryParams.subscribe((res: any) => {
      this.queryParams = res.objectId;
    })
  }

  addReviewForm = this.fb.group({
    name: [''],
    review: [''],
  })

  ngOnInit(): void {
    this.getData();
  }
  onSubmit() {
    if (!this.queryParams) {
      this.addReviewService.addOurCustomerData(this.addReviewForm.value).subscribe((res: any) => {
        if (res.status = "success") {
          this.snackbar.showMessage(res.message, 'Undo');
          this.route.navigate(['dashboard/ourcustomer']);
        }
      })
    } else {
      this.addReviewForm.value.objectId = this.editTeamObject._id;
      this.addReviewService.editOurCustomerData(this.addReviewForm.value).subscribe((res: any) => {
        if (res.status = "success") {
          this.snackbar.showMessage(res.message, 'Undo')
          this.route.navigate(['dashboard/ourcustomer']);
        }
        this.getData();
      })
    }
  }

  getData() {
    let data = {
      objectId: this.queryParams
    }
    this.addReviewService.getSingleOurCustomerData(data).subscribe((res: any) => {
      this.editTeamObject = res;
      this.setFormValue();
    })
  }


  setFormValue() {
    this.addReviewForm.patchValue({
      name: this.editTeamObject.name,
      review: this.editTeamObject.review,
    })
  }


  Cancel() {
    this.route.navigate(['dashboard/ourcustomer']);
  }

}
