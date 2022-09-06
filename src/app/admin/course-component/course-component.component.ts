import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-course-component',
  templateUrl: './course-component.component.html',
  styleUrls: ['./course-component.component.css']
})
export class CourseComponentComponent implements OnInit {

  constructor() { }

  Form = new FormGroup(
    {
      level_Shedule: new FormControl('', Validators.required),
      course: new FormControl('', Validators.required)
    }
  )

  ngOnInit(): void {
  }



}
