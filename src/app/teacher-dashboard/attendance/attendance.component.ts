import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { faSave, faTrash, faListCheck, faX, faCalendarDays, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbDateStruct, NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';

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
  faCalendarDays = faCalendarDays;
  faX = faX;
  faEdit = faEdit;
  currentD = new Date();
  model: NgbDateStruct;
  model1: NgbDateStruct;
	date: { year: number; month: number };

  constructor( private ApiService: ApiService,
    private calendar: NgbCalendar) { }

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

   isDisabled = (date: NgbDate, current: { month: number; year: number }) => date.month !== current.month;
   isWeekend = (date: NgbDate) => this.calendar.getWeekday(date) <= 5;
   isWeek = (date: NgbDate) => this.calendar.getWeekday(date) <= 5;
}
