import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faMoneyCheckDollar, faPrint, faDownload } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/services/api.service';
import { dataStudent } from 'src/app/shared/interfaces';
import Swal from 'sweetalert2';
import printJS from 'print-js';
import { UpperCasePipe } from '@angular/common';
import { PdfMakeWrapper, Txt, Table } from 'pdfmake-wrapper';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import * as XLSX from 'xlsx';
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
  faDownload = faDownload;
  faMoneyCheckDollar =faMoneyCheckDollar;
  studentId: any;
  data_courses: any;
  data_student: dataStudent = {};
  level_name: any;
  schedule_name: any;
  course_name:any;
  teacher_name:any;
  teachers: any;
  level;
  classroom;
  
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
      (Schedule) => this.verSeleccion === Schedule.id
    );
   

    this.students = filtercourse[0].Students
    this.teachers = filtercourse[0].Teachers
    this.level = filtershedule[0]
    this.classroom = filtercourse[0]

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

      const pdf = new PdfMakeWrapper();
  
      const titleTxt = new Txt(`Parroquia Santiago Apóstol de Machachi\n`)
          .fontSize(18)
          .alignment('center')
          .bold()
          .end;
  
        pdf.add(titleTxt);
  
        const title2Txt = new Txt(`Catequesis Parroquial\n\n`)
          .fontSize(16)
          .alignment('center')
          .bold()
          .end;
  
        pdf.add(title2Txt);
  
        const title3Txt = new Txt(`Listado de Alumnos\n\n`)
        .fontSize(14)
        .alignment('center')
        .end;
  
      pdf.add(title3Txt);
  
      const initialTxt = new Txt(`Nivel: ${this.level.Level.name}\n`)
          .fontSize(12)
          .bold()
          .end;
  
        pdf.add(initialTxt);
  
      const initialTxtLine2 = new Txt(`Horario: ${this.level.weekDay} (${this.level.startTime} - ${this.level.endTime})\n`)
          .fontSize(12)
          .bold()
          .end;
  
        pdf.add(initialTxtLine2);
  
        const initialTxtLine3 = new Txt(`Paralelo: ${this.classroom.name}\n`)
          .fontSize(12)
          .bold()
          .end;
  
        pdf.add(initialTxtLine3);
  
        if(this.level.id > 6){
          const initialTxtLine4 = new Txt(`Periodo: 2023-2024\n\n`)
          .fontSize(12)
          .bold()
          .end;
  
          pdf.add(initialTxtLine4);
        }else{
          const initialTxtLine5 = new Txt(`Periodo: 2022-2023\n\n`)
          .fontSize(12)
          .bold()
          .end;
  
          pdf.add(initialTxtLine5);
        }
      
        // Tabla
  
      const content = this.students.map((item, index) => {
        return [
          (index + 1).toString(),
          item.identityNumber,
          item.lastName.toUpperCase(),
          item.name.toUpperCase(),
          item.age,
          item.payment,
          '  '
        ];
      });
  
      pdf.add(
        new Table([
          ['N°', 'Cédula', 'Apellidos', 'Nombres', 'Edad', 'Recibo', 'Observaciones'],
          ...content
        ])
        .layout({
          fillColor: (rowIndex) => {
              // row 0 is the header
              if (rowIndex === 0) {
                return '#D0D3D4';
              }
      
              return '#ffffff';
          }
        },
        )
        .widths([15, 'auto', 'auto','auto','auto','auto', 100])
        .fontSize(9)
        .end
      );
  
      const pdfName = `Listado_${this.level.Level.name}_${this.classroom.name}.pdf`;
      pdf.create().print();
      //pdf.create().download(pdfName);
    } else {
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


exportarAExcel(){
  if(this.students){
  const nombreArchivo = (this.level_name + ' ' + 'Paralelo' + ' ' + this.course_name + '_' + "listado" + ".xlsx");
  const hojaDeCalculo = XLSX.utils.table_to_sheet(document.getElementById('lista_del_curso'));
  const libroDeTrabajo = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libroDeTrabajo, hojaDeCalculo, 'Listado de Curso');
  XLSX.writeFile(libroDeTrabajo, nombreArchivo);
  hojaDeCalculo['column'](3).width = 15;
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
