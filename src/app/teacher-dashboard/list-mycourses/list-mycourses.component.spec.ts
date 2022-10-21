import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMycoursesComponent } from './list-mycourses.component';

describe('ListMycoursesComponent', () => {
  let component: ListMycoursesComponent;
  let fixture: ComponentFixture<ListMycoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMycoursesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMycoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
