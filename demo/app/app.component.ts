import { Component } from '@angular/core';
import { Fn } from '@iapps/function-analytics';
import { PeriodFilterConfig } from 'projects/ngx-dhis2-period-filter/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
    if (Fn) {
      Fn.init({
        baseUrl: '../../../api/'
      });
    }
  }
  title = 'ngx-dhis2-period-filter';
  periodObject: any;
  action: string;
  periodFilterConfig: PeriodFilterConfig = {
    singleSelection: false,
    emitOnSelection: false
  };
  selectedPeriodItems: any[] = [];

  onPeriodUpdate(periodObject, action) {
    this.periodObject = periodObject;
    this.action = action;
  }
}
