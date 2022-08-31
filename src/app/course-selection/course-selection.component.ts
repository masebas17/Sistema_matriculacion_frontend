import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { datalevel, datashedule, datacourses } from '../shared/interfaces';

@Component({
  selector: 'app-course-selection',
  templateUrl: './course-selection.component.html',
  styleUrls: ['./course-selection.component.css']
})
export class CourseSelectionComponent implements OnInit {
  
  tittle = 'client';
  course: any;
  sheduleId: number = 0;
  course_selection: any;
  

  constructor(private _apiService:ApiService,
    private _router: Router,
    private activateRoute: ActivatedRoute ) {
    this.course = {}
   }

  ngOnInit(): void {
    this.activateRoute.params.subscribe( params =>{
      console.log(parseInt(params['id']))
      this.sheduleId = parseInt(params['id'])
    })
    this.getCourse()
  }

  getCourse(){
    this._apiService.getCourses(this.sheduleId).subscribe((resp: datacourses[]) =>
    {
      console.log(resp),
      this.course = resp
    })
  }

  enroll(event: any){
    console.log(event.target.name)
    this._router.navigate(['/enrollment', event.target.name])
    
  }

}
