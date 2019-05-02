import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxDhis2PeriodFilterModule } from 'projects/ngx-dhis2-period-filter/src/public-api';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, NgxDhis2PeriodFilterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
