import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { faArrowAltCircleLeft, faPrint } from '@fortawesome/free-solid-svg-icons';
import printJS from 'print-js';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-mycourses',
  templateUrl: './list-mycourses.component.html',
  styleUrls: ['./list-mycourses.component.css']
})
export class ListMycoursesComponent implements OnInit {

courseId: any;
courses: any;
students: any;
name_course: any;
name_level: any;
faArrowAltCircleLeft = faArrowAltCircleLeft;
faPrint = faPrint;

  constructor( 
    private activateRoute: ActivatedRoute,
    private ApiService: ApiService) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      console.log(parseInt(params['id']))
      this.courseId = parseInt(params['id'])
    })

    this.getcourses()
  }

  async getcourses(){
    const resp = await this.ApiService.get_Teacher_info()
    this.courses = resp.data.Teacher.Courses

    const filtercourse = this.courses.filter(
      (course) => this.courseId === course.id
    );


    this.students = filtercourse[0].Students

    this.name_course = filtercourse[0].name
    this.name_level =filtercourse[0].Schedule.Level.name

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
  }

  print(){
    if(this.students){
    printJS({ printable: 'lista_del_curso', type: 'html', documentTitle: 'Sistema de Gestión de Catequesis - Generación de listas', targetStyles: ['*'],
    header: '<h2 class="custom">Parroquia Eclesiástica Santiago Apóstol de Machachi <br>Catequesis 2022-2023</h2><hr><br>',
    style: '.custom { color: black;}', maxWidth:1000, font_size: '9pt', font: 'Arial', ignoreElements: ["num_cedula", "btn-edit-voucher", "btn-creater-voucher", "actions","scroll"],
    honorMarginPadding: true
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
