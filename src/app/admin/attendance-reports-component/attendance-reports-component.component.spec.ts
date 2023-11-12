import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceReportsComponentComponent } from './attendance-reports-component.component';

describe('AttendanceReportsComponentComponent', () => {
  let component: AttendanceReportsComponentComponent;
  let fixture: ComponentFixture<AttendanceReportsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceReportsComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceReportsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
