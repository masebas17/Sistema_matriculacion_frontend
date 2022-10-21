import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faMoneyCheckDollar, faPrint } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/services/api.service';
import { dataStudent } from 'src/app/shared/interfaces';
import Swal from 'sweetalert2';
import printJS from 'print-js';
import { UpperCasePipe } from '@angular/common';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-list-courses',
  templateUrl: './list-courses.component.html',
  styleUrls: ['./list-courses.component.css']
})
export class ListCoursesComponent implements OnInit {

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
  faMoneyCheckDollar =faMoneyCheckDollar;
  studentId: any;
  data_courses: any;
  data_student: dataStudent = {};
  level_name: any;
  schedule_name: any;
  course_name:any;
  teacher_name:any;
  teachers: any;
  
  constructor( private _apiService: ApiService,
    private router: Router) {
    this.shedules = {};
    this.courses = [];
   }

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
    this.data_courses = resp
    console.log(this.data_courses)
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
    this.teachers = filtercourse[0].Teachers

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
      this.schedule_name = (filtershedule[0].weekDay + ' ' + '( '+ filtershedule[0].startTime +' - '+ filtershedule[0].endTime + ' )');
      this.level_name = filtershedule[0].Level.name;
      this.course_name = filtercourse[0].name;

      document.getElementById('Text_Schedule').innerHTML =(filtershedule[0].weekDay + ' ' + '( '+ filtershedule[0].startTime +' - '+ filtershedule[0].endTime + ' )')
      document.getElementById('Text_level').innerHTML = filtershedule[0].Level.name
      document.getElementById('Text_course').innerHTML = filtercourse[0].name
    //   if(filtercourse[0].Teacher != null){
    //   document.getElementById('Text_Teacher').innerHTML = (filtercourse[0].Teachers.lastName + ' ' + filtercourse[0].Teachers.name).toUpperCase() 
    //   this.teacher_name = (filtercourse[0].Teachers.lastName + ' ' + filtercourse[0].Teachers.name).toUpperCase()
    // }
    //   else{
    //     this.teacher_name = 'No asignado'
    //     document.getElementById('Text_Teacher').innerHTML = 'No asignado'
    //   }
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

  print2(){
    printJS({
      printable: this.students,
      type: 'json',
      properties: [
        {field:'identityNumber', displayName: 'Cédula'},
        {field: 'lastName', displayName: 'Apellidos'}, 
        {field:'name', displayName: 'Nombres'},
        {field:'age', displayName:'Edad'},
        {field:'payment', displayName: 'Recibo'}
      ],
      header: '<h2 class="custom">Parroquia Eclesiástica Santiago Apóstol de Machachi <br>Catequesis 2022-2023</h2><hr><br>',
      // style: '.custom-h3 { color: red; }'
      style: '.custom { color: black;}', font_size: '8pt', honorMarginPadding: true,
      })

  }

    createList(){

      const voucher: any = {
        pageSize: 'A4',
        content: [
          {
            text: 'Parroquia Santiago Apóstol de Machachi\n\n',
            style: 'header',
            alignment: 'center',
            color: 'red'
          },
          {
            text: 'Datos de Curso\n\n',
            style: 'subheader',
            margin:[10,0]
          },
            {
              style: 'tableExample',
              table: {
              body: [
            ['Nivel','Horario', 'Paralelo','Catequista'],
            [this.level_name, this.schedule_name, 'Paralelo'+ ' ' +this.course_name , this.teacher_name],
          ]
        },
        margin: [10,0]
      },
      {
        style: 'tableExample',
        table: {
          headerRows: 1,
          body: [
            [{text: 'Last', style: 'tableHeader'}, {text: 'Header 2', style: 'tableHeader'}, {text: 'Header 3', style: 'tableHeader'}],
            [this.students.filter],
          ]
        },
        layout: 'lightHorizontalLines'
      },
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true
          },
          subheader: {
            fontSize: 15,
            bold: true
          },
          quote: {
            italics: true
          },
          small: {
            fontSize: 8
          }
        },
    }
      const pdf = pdfMake.createPdf(voucher)
      pdf.open()
      pdf.download("Listado de Curso" + " " + this.level_name + ' ' + 'Paralelo' + ' ' + this.course_name + ".pdf")
    }
  }

