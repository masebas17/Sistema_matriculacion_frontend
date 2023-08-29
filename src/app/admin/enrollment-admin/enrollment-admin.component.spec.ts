import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentAdminComponent } from './enrollment-admin.component';

describe('EnrollmentAdminComponent', () => {
  let component: EnrollmentAdminComponent;
  let fixture: ComponentFixture<EnrollmentAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrollmentAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollmentAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
