import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnDestroy
} from '@angular/core';
import { PERIOD_TYPES } from '../../constants/period-types.constant';
import { getPeriodType } from '../../helpers/get-period-type.helper';
import { getAvailablePeriods } from '../../helpers/get-available-periods.helper';
import { removePeriodFromList } from '../../helpers/remove-period-from-list.helper';
import { addPeriodToList } from '../../helpers/add-period-to-list.helper';
import { getSanitizedPeriods } from '../../helpers/get-sanitized-periods.helper';
import { Fn } from '@iapps/function-analytics';

@Component({
  selector: 'ngx-dhis2-period-filter',
  templateUrl: './period-filter.component.html',
  styleUrls: ['./period-filter.component.css']
})
export class PeriodFilterComponent implements OnInit, OnChanges, OnDestroy {
  @Input() selectedPeriodType;
  @Input() selectedPeriods: any[];
  @Input()
  periodFilterConfig: any = {
    resetOnPeriodTypeChange: false,
    emitOnSelection: false,
    singleSelection: false
  };

  @Output() update = new EventEmitter();
  @Output() close = new EventEmitter();

  availablePeriods: any[];
  selectedYear: number;
  currentYear: number;
  periodTypes: any[];
  periodInstance: any;

  constructor() {
    const periodTypeInstance = new Fn.PeriodType();
    this.periodInstance = new Fn.Period();

    this.periodTypes = periodTypeInstance.get();
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
    if (!selectedPeriodType) {
      if (this.selectedPeriods[0]) {
        this.selectedPeriodType = this.selectedPeriods[0].type || 'Monthly';
      } else {
        this.selectedPeriodType = 'Monthly';
      }
    }

    this.periodInstance
      .setType(this.selectedPeriodType)
      .setCalendar('ethiopian')
      .get();

    this.selectedYear = this.currentYear = this.periodInstance.currentYear();

    this._setAvailablePeriods(this.selectedPeriodType);
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

  updatePeriodType() {
    if (this.periodFilterConfig.resetOnPeriodTypeChange) {
      this.selectedPeriods = [];
    }

    this.periodInstance.setType(this.selectedPeriodType).get();

    this._setAvailablePeriods(this.selectedPeriodType);
  }

  pushPeriodBackward(e) {
    e.stopPropagation();
    this.selectedYear--;
    this.periodInstance.setYear(this.selectedYear).get();
    this._setAvailablePeriods(this.selectedPeriodType);
  }

  pushPeriodForward(e) {
    e.stopPropagation();
    this.selectedYear++;
    this.periodInstance.setYear(this.selectedYear).get();
    this._setAvailablePeriods(this.selectedPeriodType);
  }

  onSelectAllPeriods(e) {
    e.stopPropagation();

    // Add all period to selected bucket
    this.selectedPeriods = [...this.availablePeriods, ...this.selectedPeriods];

    // remove all periods from available
    this.availablePeriods = [];

    if (this.periodFilterConfig.emitOnSelection) {
      this._onUpdatePeriod();
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
      [],
      this.periodInstance.list()
    );

    if (this.periodFilterConfig.emitOnSelection) {
      this._onUpdatePeriod();
    }
  }

  onUpdate(e) {
    e.stopPropagation();
    this._onUpdatePeriod();
  }

  onClose(e) {
    e.stopPropagation();
    this.close.emit(this._getPeriodSelection());
  }

  ngOnDestroy() {
    this.close.emit(this._getPeriodSelection());
  }

  private _getPeriodSelection() {
    return {
      items: this.selectedPeriods,
      dimension: 'pe',
      changed: true
    };
  }

  private _onUpdatePeriod() {
    this.update.emit(this._getPeriodSelection());
  }

  private _setAvailablePeriods(periodType: string) {
    this.availablePeriods = getAvailablePeriods(
      periodType,
      this.selectedYear,
      this.selectedPeriods,
      this.periodInstance.list()
    );
  }
}
