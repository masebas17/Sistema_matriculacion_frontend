import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CourseComponentComponent } from '../admin/course-component/course-component.component';
import { ApiService } from '../services/api.service';
import { dataStudent } from '../shared/interfaces';




@Component({
  selector: 'app-enrollment-form',
  templateUrl: './enrollment-form.component.html',
  styleUrls: ['./enrollment-form.component.css']
})
export class EnrollmentFormComponent implements OnInit {
  
  student: dataStudent = {};
  courseId: number = 0;

  constructor( private _formbuilder: FormBuilder,
    private _apiService: ApiService,
    private activateRoute: ActivatedRoute) { 
      

    }

    signupForm = new FormGroup(
      {
        identityNumber: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
        lastName: new FormControl('', Validators.required),
        name: new FormControl('', Validators.required) ,
        age: new FormControl('', Validators.required) ,
        parentName: new FormControl('', Validators.required) ,
        phone1: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(10)])) ,
        email: new FormControl('', Validators.email),
        address: new FormControl('', Validators.required),
        baptized: new FormControl ('', Validators.required) ,
        disability: new FormControl ('', Validators.required)
      }
    )

    // Reactive form del login
     signupForm2 = new FormGroup({
    identityNumber: new FormControl(' ',
      [Validators.required, Validators.maxLength(10), Validators.minLength(10)]
    ),
    pwd: new FormControl('', Validators.required),
  });

 

  ngOnInit() {
    this.activateRoute.params.subscribe( params =>{
      console.log(parseInt(params['id']))
      this.courseId = parseInt(params['id'])
    })
  }

  registrar(values: any){
    this.student = values
    this.student.courseId = this.courseId
    console.log(this.student)
    this._apiService.enrollemnt(this.student).subscribe((resp: dataStudent[]) =>
    {
      console.log(resp)
    })
    
}

get form(){
  return this.signupForm.controls;
}
  
  
    
  
   // const aux =  {
     // "name": this.signupForm.value.name,
     // "lastName": this.signupForm.value.lastName,
     // "age": this.signupForm.value.age,
     // "identityNumber": this.signupForm.value.identityNumber,
     // "parentName": this.signupForm.value.parentName,
     // "address": this.signupForm.value.address,
     // "phone1": this.signupForm.value.phone,
     // "phone2": null,
     // "email": this.signupForm.value.email,
     // "baptized": this.signupForm.value.baptized,
     // "disability": this.signupForm.value.disability
 // }

   

}
