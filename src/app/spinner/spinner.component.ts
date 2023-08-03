import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../sharedApi/loader.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  constructor(private loader:LoaderService) { }
  isLoading: Subject<boolean> = this.loader.isLoading;
  ngOnInit(): void {
  }

}
