import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  SimpleChanges
} from '@angular/core';
import { PERIOD_TYPES } from '../../constants/period-types.constant';
import { getPeriodType } from '../../helpers /get-period-type.helper';
import { getAvailablePeriods } from '../../helpers /get-available-periods.helper';
import { removePeriodFromList } from '../../helpers /remove-period-from-list.helper';
import { addPeriodToList } from '../../helpers /add-period-to-list.helper';
import { getSanitizedPeriods } from '../../helpers /get-sanitized-periods.helper';

@Component({
  selector: 'ngx-dhis2-period-filter',
  templateUrl: './period-filter.component.html',
  styleUrls: ['./period-filter.component.css']
})
export class PeriodFilterComponent implements OnInit, OnChanges {
  @Input() selectedPeriodType;
  @Input() selectedPeriods: any[];
  @Input()
  periodFilterConfig: any = {
    resetOnPeriodTypeChange: false,
    emitOnSelection: false,
    singleSelection: false
  };
  @Output() periodFilterUpdate = new EventEmitter();
  @Output() periodFilterClose = new EventEmitter();

  availablePeriods: any[];
  selectedYear: number;
  currentYear: number;
  periodTypes: any[];

  constructor() {
    const date = new Date();
    this.selectedYear = date.getFullYear();
    this.currentYear = date.getFullYear();
    this.periodTypes = PERIOD_TYPES;
    this.periodTypes = PERIOD_TYPES;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedPeriods && !changes.selectedPeriods.firstChange) {
      this._setPeriodProperties(null);
    }
  }

  ngOnInit() {
    // Initialize selected periods if not defined
    if (!this.selectedPeriods) {
      this.selectedPeriods = [];
    }

    this._setPeriodProperties(this.selectedPeriodType);
  }

  private _setPeriodProperties(selectedPeriodType) {
    this.selectedPeriods = getSanitizedPeriods(this.selectedPeriods);

    // Get selected period type if not supplied
    if (!selectedPeriodType && this.selectedPeriods[0]) {
      this.selectedPeriodType = this.selectedPeriods[0].type;
    }

    this.availablePeriods = getAvailablePeriods(
      this.selectedPeriodType,
      this.selectedYear,
      this.selectedPeriods
    );
  }

  onSelectPeriod(period, e) {
    e.stopPropagation();

    if (this.periodFilterConfig.singleSelection) {
      this.selectedPeriods = [];
    }

    // Add selected period to selection bucket
    this.selectedPeriods = [...this.selectedPeriods, period];

    // Remove selected period to available bucket
    this.availablePeriods = removePeriodFromList(this.availablePeriods, period);
  }

  onDeselectPeriod(period: any, e) {
    e.stopPropagation();

    // Remove period from selection list
    this.selectedPeriods = removePeriodFromList(this.selectedPeriods, period);

    // Add back the removed period to the available period if applicable
    this.availablePeriods = addPeriodToList(this.availablePeriods, {
      ...period,
      type: period.type || getPeriodType([period])
    });
  }

  updatePeriodType(periodType: string, e) {
    e.stopPropagation();

    if (this.periodFilterConfig.resetOnPeriodTypeChange) {
      this.selectedPeriods = [];
    }

    this.availablePeriods = getAvailablePeriods(
      periodType,
      this.selectedYear,
      this.selectedPeriods
    );
  }

  pushPeriodBackward(e) {
    e.stopPropagation();
    this.selectedYear--;
    this.availablePeriods = getAvailablePeriods(
      this.selectedPeriodType,
      this.selectedYear,
      this.selectedPeriods
    );
  }

  pushPeriodForward(e) {
    e.stopPropagation();
    this.selectedYear++;
    this.availablePeriods = getAvailablePeriods(
      this.selectedPeriodType,
      this.selectedYear,
      this.selectedPeriods
    );
  }

  onSelectAllPeriods(e) {
    e.stopPropagation();

    // Add all period to selected bucket
    this.selectedPeriods = this.availablePeriods;

    // remove all periods from available
    this.availablePeriods = [];

    if (this.periodFilterConfig.emitOnSelection) {
      this.getPeriodOutput();
    }
  }

  onDeselectAllPeriods(e) {
    e.stopPropagation();
    // remove all items from selected bucket
    this.selectedPeriods = [];

    // add to available period bucket
    this.availablePeriods = getAvailablePeriods(
      this.selectedPeriodType,
      this.selectedYear,
      []
    );

    if (this.periodFilterConfig.emitOnSelection) {
      this.getPeriodOutput();
    }
  }

  updatePeriod(e) {
    e.stopPropagation();
    this.getPeriodOutput();
  }

  private _getPeriodSelection() {
    return {
      items: this.selectedPeriods,
      dimension: 'pe',
      changed: true
    };
  }

  getPeriodOutput() {
    this.periodFilterUpdate.emit(this._getPeriodSelection());
  }

  closePeriodFilter(e) {
    e.stopPropagation();
    this.periodFilterClose.emit(this._getPeriodSelection);
  }
}
