import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxDhis2PeriodFilterModule } from 'projects/ngx-dhis2-period-filter/src/public-api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDhis2HttpClientModule } from '@iapps/ngx-dhis2-http-client';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxDhis2PeriodFilterModule,
    NgxDhis2HttpClientModule.forRoot({
      version: 1,
      namespace: 'iapps',
      models: {}
    }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
