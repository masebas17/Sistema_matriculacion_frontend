import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyInformationStudentsComponent } from './verify-information-students.component';

describe('VerifyInformationStudentsComponent', () => {
  let component: VerifyInformationStudentsComponent;
  let fixture: ComponentFixture<VerifyInformationStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyInformationStudentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyInformationStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
