import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxDhis2PeriodFilterComponent } from './ngx-dhis2-period-filter.component';

describe('NgxDhis2PeriodFilterComponent', () => {
  let component: NgxDhis2PeriodFilterComponent;
  let fixture: ComponentFixture<NgxDhis2PeriodFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxDhis2PeriodFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxDhis2PeriodFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
