import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { editCourses } from 'src/app/shared/interfaces';

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
  opcion: number = 0;
  opcion_teacher: number = 0;
  shedules: any;
  courses: any;
  Schedule_data: any;
  data_courses: any;
  faEdit = faEdit;
  faTrash = faTrash;
  list_teachers: any;
  data_courses_edit: editCourses;
  cupo: number;
  courseId: any;
  id_course: any

  constructor( private _apiService: ApiService,
    private router: Router) { 

    this.shedules = {};
    this.courses = [];
    }


  ngOnInit(): void {
    this.getShedule()
  }
  FormCourse = new FormGroup(
    {
      maxStudents: new FormControl('30',[Validators.min(30), Validators.max(50),Validators.maxLength(2)]),
      Teacher: new FormControl('')
    }
  )

  capturar(){
    this.verSeleccion = this.opcionSeleccionada
    console.log(this.verSeleccion)

  }

  capturar_curso(){
    this.verSeleccion_curso = this.seleccion_curso
    console.log(this.verSeleccion_curso)
  }

  capturar_teacher(){
    this.opcion_teacher = this.opcion
    console.log(this.opcion_teacher)
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

  
  async getTeachers(){
    const resp = await this._apiService.get_Teacher_admin(this.verSeleccion)
    this.list_teachers = resp.data;
    console.log(this.list_teachers)
    this.opcion = 0;
  }

  async edit(event: any){
    console.log(event.target.name)
    this.courseId =  parseInt(event.target.name)

    const findCourseId = this.courses.find(
      (course) => course.id  === this.courseId
    );

    this.id_course = findCourseId.id
    console.log(this.id_course)

    this.getTeachers()
  }

  async edit_course(){
    this.data_courses_edit ={
      name: this.courses.name,
      maxStudents: this.FormCourse.get('maxStudents').value,
      teacherId: this.opcion_teacher,
      scheduleId: this.verSeleccion
    }
    const resp = await this._apiService.edit_course(this.id_course, this.data_courses_edit)
    console.log(resp)

    this.getcourses()
  }

  async Quitar_Catequista(){
    this.data_courses_edit ={
      name: this.courses.name,
      maxStudents: this.FormCourse.get('maxStudents').value,
      teacherId: null,
      scheduleId: this.verSeleccion
    }
    const resp = await this._apiService.edit_course(this.id_course, this.data_courses_edit)
    console.log(resp)

    this.getcourses()
  }
}
