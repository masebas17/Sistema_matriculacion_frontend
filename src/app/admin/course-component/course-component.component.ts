import { NgForOf, UpperCasePipe } from '@angular/common';
import { ResourceLoader } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { loadavg } from 'os';
import { ApiService } from 'src/app/services/api.service';
import { dataStudent } from 'src/app/shared/interfaces';
import Swal from 'sweetalert2';
import printJS from 'print-js'
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { AsignatedPipe } from 'src/app/shared/asignated.pipe';


@Component({
  selector: 'app-course-component',
  templateUrl: './course-component.component.html',
  styleUrls: ['./course-component.component.css']
})
export class CourseComponentComponent implements OnInit {
  opcionSeleccionada: number = 0;
  verSeleccion: number = 0;
  seleccion_curso: number = 0;
  verSeleccion_curso: number = 0;
  shedules: any;
  courses: any;
  students: Array<dataStudent>;
  courseId: any;
  Schedule_data: any;
  faprint = faPrint;

  constructor(
    private _apiService: ApiService,
    private router: Router
  ) { 
    this.shedules = {};
    this.courses = [];
    
  }


  Formpay = new FormGroup(
    {
      pay: new FormControl('', Validators.required)
    }
  )
  ngOnInit(): void {
    this.getShedule()
  }


  capturar(){
    this.verSeleccion = this.opcionSeleccionada
    console.log(this.verSeleccion)
    this.getcourses()
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
    console.log(this.courses)
    this.seleccion_curso = 0;
  }

  listado(){
    const filtercourse = this.courses.filter(
      (course) => this.verSeleccion_curso === course.id
    );

    const filtershedule = this.Schedule_data.filter(
      (Schedule) => this.verSeleccion === Schedule.Level.id
    );
   

    this.students = filtercourse[0].Students

      if(this.students){
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
        })
         Toast.fire({
          icon: 'success',
          title: 'Generando listado'
        }).then(() =>{

        
      })
      }

      document.getElementById('Text_Schedule').innerHTML =(filtershedule[0].weekDay + ' ' + '( '+ filtershedule[0].startTime +' - '+ filtershedule[0].endTime + ' )')
      document.getElementById('Text_level').innerHTML = filtershedule[0].Level.name
      document.getElementById('Text_course').innerHTML = filtercourse[0].name
      document.getElementById('Text_Teacher').innerHTML = filtercourse[0].Teacher
     
  }


  print2(){
    printJS({
      printable: this.students,
      type: 'json',
      properties: [
        {field:'identityNumber', displayName: 'Cédula'},
        {field: 'lastName', displayName: 'Apellidos', targetStyles: ['*']}, 
        {field:'name', displayName: 'Nombres'},
        {field:'age', displayName:'Edad'},
        {field:'null', displayName: 'Observaciones'}
      ],
      header: '<h3 class="custom-h3">My custom header</h3>',
      style: '.custom-h3 { color: red; }'
      })

  }

  print(){
    if(this.students){
    printJS({ printable: 'lista_del_curso', type: 'html', documentTitle: 'Sistema de Gestión de Catequesis - Generación de listas', targetStyles: ['*'],
    header: '<h2 class="custom">Parroquia Eclesiástica Santiago Apóstol de Machachi <br>Catequesis 2022-2023</h2><hr><br>',
    style: '.custom { color: black;}', font_size: '9pt', honorMarginPadding: true, font: 'Arial', ignoreElements: ["table-responsive", "num_cedula", "status"]
  })
    }
    else{
      Swal.fire({
        icon: 'error',
        text: 'Debe generar primero la lista',
        confirmButtonColor: '#1D71B8'
      })
    }
  }

 
  }
  

