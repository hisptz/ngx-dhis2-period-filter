import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PeriodFilterComponent } from './containers/period-filter/period-filter.component';

@NgModule({
  declarations: [PeriodFilterComponent],
  imports: [CommonModule, FormsModule],
  exports: [PeriodFilterComponent]
})
export class NgxDhis2PeriodFilterModule {}
