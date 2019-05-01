import { TestBed } from '@angular/core/testing';

import { NgxDhis2PeriodFilterService } from './ngx-dhis2-period-filter.service';

describe('NgxDhis2PeriodFilterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxDhis2PeriodFilterService = TestBed.get(NgxDhis2PeriodFilterService);
    expect(service).toBeTruthy();
  });
});
