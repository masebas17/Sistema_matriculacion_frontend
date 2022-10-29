import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverdataComponent } from './recoverdata.component';

describe('RecoverdataComponent', () => {
  let component: RecoverdataComponent;
  let fixture: ComponentFixture<RecoverdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecoverdataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoverdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
