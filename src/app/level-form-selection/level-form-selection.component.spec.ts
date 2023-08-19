import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelFormSelectionComponent } from './level-form-selection.component';

describe('LevelFormSelectionComponent', () => {
  let component: LevelFormSelectionComponent;
  let fixture: ComponentFixture<LevelFormSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelFormSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelFormSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
