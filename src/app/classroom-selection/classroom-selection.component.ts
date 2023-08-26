import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { datalevel, datashedule, datacourses } from '../shared/interfaces';


@Component({
  selector: 'app-classroom-selection',
  templateUrl: './classroom-selection.component.html',
  styleUrls: ['./classroom-selection.component.css']
})
export class ClassroomSelectionComponent implements OnInit {

  tittle = 'client';
  course: any;
  sheduleId: number = 0;
  course_selection: any;
  identity_Number: number;
  

  constructor(private _apiService:ApiService,
    private _router: Router,
    private activateRoute: ActivatedRoute ) {
    this.course = {}
   }

  ngOnInit(): void {
    this.activateRoute.params.subscribe( params =>{
      console.log(parseInt(params['id']))
      console.log(parseInt(params['identityNumber']))
      this.sheduleId = parseInt(params['id'])
      this.identity_Number = (params['identityNumber'])
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
    localStorage.setItem("en", event.target.name)
    this._router.navigate(['/verify_information', event.target.name, this.identity_Number])
    
  }

}
