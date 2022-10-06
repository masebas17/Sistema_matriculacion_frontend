import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
  opcionSeleccionada: number = 0;
  verSeleccion: number = 0;
  seleccion_curso: number = 0;
  verSeleccion_curso: number = 0;
  shedules: any;
  courses: any;
  Schedule_data: any;
  data_courses: any;
  faEdit = faEdit;
  faTrash = faTrash;

  constructor( private _apiService: ApiService,
    private router: Router) { 

    this.shedules = {};
    this.courses = [];
    }

    FormCourse = new FormGroup(
      {
        maxStudents: new FormControl('', Validators.required)
      }
    )

  ngOnInit(): void {
    this.getShedule()
  }

  capturar(){
    this.verSeleccion = this.opcionSeleccionada
    console.log(this.verSeleccion)

  }

  capturar_curso(){
    this.verSeleccion_curso = this.seleccion_curso
    console.log(this.verSeleccion_curso)
  }

  async getShedule(){
    const resp = await this._apiService.getschedules_from_admin()
    console.log(resp)
    this.shedules = resp
    this.Schedule_data = resp.data
  }

 
    async getcourses(){
      const resp = await this._apiService.getCoursesbyid(this.verSeleccion)
      this.courses = resp.data
      this.data_courses = resp
      console.log(this.data_courses)
      this.seleccion_curso = 0;
    }

  edit(){
    this.FormCourse.setValue({

      maxStudents: this.courses.maxStudents,
  })
  }

}
