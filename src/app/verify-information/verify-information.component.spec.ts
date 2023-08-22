import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyInformationComponent } from './verify-information.component';

describe('VerifyInformationComponent', () => {
  let component: VerifyInformationComponent;
  let fixture: ComponentFixture<VerifyInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
