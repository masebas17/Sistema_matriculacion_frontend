import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { faSave, faTrash, faListCheck, faX } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  opcionSeleccionada: number = 0;
  verSeleccion: number = 0;
  mycourses: any;
  courses: any;
  students: any;
  name_teacher: any;
  faSave = faSave;
  faTrash = faTrash;
  faListCheck = faListCheck;
  faX = faX;
  currentD = new Date();

  constructor( private ApiService: ApiService) { }

  ngOnInit(): void {
    this.misCursos();
  }

  Attendace_form = new FormGroup({    
    presentDate: new FormControl((new Date()).toISOString().substring(0,10))
   });



  capturar(){
    this.verSeleccion = this.opcionSeleccionada
    console.log(this.verSeleccion)
    this.listado()
  }

  async misCursos(){
    const resp = await this.ApiService.get_Teacher_info()
    console.log(resp)

    this.mycourses = resp.data.Teacher.Courses
    this.courses = resp.data.Teacher.Courses
  } 

  async listado(){
   
    const filtercourse = this.courses.filter(
      (course) => this.verSeleccion === course.id
    );


    this.students = filtercourse[0].Students


      if(this.students){
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        })
         Toast.fire({
          icon: 'success',
          title: 'Preparando listado'
        })
      }
  } 

}
