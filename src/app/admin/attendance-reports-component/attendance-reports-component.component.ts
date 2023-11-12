import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { faSave, faTrash, faListCheck, faX, faCalendarDays, faEdit, faFilePdf, faPrint } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbDateStruct, NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { PdfMakeWrapper, Txt, Table, Columns, Stack, Img} from 'pdfmake-wrapper';
import { auto, left } from '@popperjs/core';

@Component({
  selector: 'app-attendance-reports-component',
  templateUrl: './attendance-reports-component.component.html',
  styleUrls: ['./attendance-reports-component.component.css']
})
export class AttendanceReportsComponentComponent implements OnInit {

  opcionSeleccionada: number = 0;
  verSeleccion: number = 0;
  seleccion_curso: number = 0;
  verSeleccion_curso: number = 0;
  shedules: any;
  Schedule_data: any;
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
  faFilePdf = faFilePdf;
  faPrint = faPrint;
  courseId: any;
  fechas: any;
  idStudents: any;
  fechasAsistencias: any;
  asistenciasPorFecha: any = {};
  justificaciones: any[] = [];
  observacionesPorFecha = {};
  studentsWithJustifications: any[] = [];
  processedStudents = new Set();
  principal: any;
  teachers: any;
  teacher: any;
  Level: any;
  Schedule: any;
  classroom: any;
  ListStudents: any;
  selloImage = '../assets/images/images_documents/Escudo_parroquial_machachi-01.png';
  
  getStyles(asistenciaLabel: string): any {
    const styles = {
      A: { backgroundColor: 'rgba(40, 167, 69, 0.5)' },
      F: { backgroundColor: 'rgba(255, 0, 0, 0.5)' },
      J: { backgroundColor: 'rgba(255, 215, 0, 0.5)' }
    };
    
    if (styles.hasOwnProperty(asistenciaLabel)) {
      return styles[asistenciaLabel];
    } else {
      // Si asistenciaLabel no se encuentra en el objeto styles, puedes devolver un estilo predeterminado o un objeto vacío.
      // Por ejemplo, puedes usar un estilo predeterminado cuando el valor no existe en styles:
      // return styles['default'] || {};
      return {}; // Devuelve un objeto vacío
    }
  }

  constructor(private ApiService: ApiService) { }

  ngOnInit(): void {
    this.getShedule()
  }

  capturar(){
    this.verSeleccion = this.opcionSeleccionada
    console.log(this.verSeleccion)
    this.resetTableData();
    this.getcourses()
  }

  capturar_curso(){
    this.verSeleccion_curso = this.seleccion_curso
    console.log(this.verSeleccion_curso)
    this.listado();
  }

  async getShedule(){
    const resp = await this.ApiService.getschedules_all()
    // console.log(resp)
    this.shedules = resp
    this.Schedule_data = resp.data
  }

  async getcourses(){
    const resp = await this.ApiService.getCoursesbyid(this.verSeleccion)
    this.courses = resp.data
    this.seleccion_curso = 0;
    
  }

  async listado(){

    // console.log('Courses', this.courses)
    
    const filtercourse = this.courses.filter(
      (course) => this.verSeleccion_curso === course.id
      
    );

    const filtershedule = this.Schedule_data.filter(
      (Schedule) => this.verSeleccion === Schedule.id
    );


    this.courseId = filtercourse[0].id

    this.classroom = filtercourse[0].name
    this.Level = filtershedule[0].Level.name
    this.Schedule = filtershedule[0]
    this.teachers = filtercourse[0].Teachers

    // console.log('courseId selecccionado', this.courseId)

    // console.log('paralelo', this.classroom)
    // console.log('nivel', this.Level)
    // console.log('profesor', this.teachers)
    
    
    const resp = await this.ApiService.get_report_Assistance(this.courseId)

   if(resp){

    const data = resp.data;
    this.fechas = data.map(item => item.date); // Obtener todas las fechas
    this.students = data[0].students 


    for (const attendance of data) {
      const justifiedStudents = this.getStudentsWithJustifications(attendance.students);
      for (const student of justifiedStudents) {
        if (!this.processedStudents.has(student.id)) {
          this.studentsWithJustifications.push(student);
          this.processedStudents.add(student.id);
        }
      }
    }

    for (const asistencia of data) {
      const fecha = asistencia.date;
      if (!this.asistenciasPorFecha[fecha]) {
        this.asistenciasPorFecha[fecha] = {};
      }
      for (const student of asistencia.students) {
        const studentId = student.id;
        const asistenciaLabel = student.label;
        this.asistenciasPorFecha[fecha][studentId] = asistenciaLabel;
  
        if (asistenciaLabel === 'J' && student.observation) {
          // Si es una justificación (label 'J') y hay una observación, la agregamos al arreglo de justificaciones
          if (!this.observacionesPorFecha[fecha]) {
            this.observacionesPorFecha[fecha] = {};
          }
          this.observacionesPorFecha[fecha][studentId] = student.observation;
        }
      }
    }



  this.students = data[0].students 
  this.fechasAsistencias = Object.keys(this.asistenciasPorFecha);
  this.justificaciones = Object.keys(this.observacionesPorFecha);


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
    }else{
      // Swal.fire({
      //   icon: 'error',
      //   text: 'No se encontraron datos',
      //   confirmButtonColor: '#1D71B8'
      // })
      this.resetTableData();
    }
  }


   getStudentsWithJustifications(students: any[]): any[] {
    return students.filter(student => student.label === 'J');
  }

  resetTableData() {
    this.fechasAsistencias = [];
    this.justificaciones = [];
    this.asistenciasPorFecha = {};
    this.studentsWithJustifications = [];
    this.processedStudents.clear();
    this.observacionesPorFecha = {};
    this.students = [];
  }
  
 async exportarReporte(action) {

      if(this.students){
  
      const pdf = new PdfMakeWrapper();

      pdf.pageOrientation('landscape');
      pdf.pageMargins([20, 15, 20, 15]) // [left, top, right, bottom]

      
      const currentDateTime = new Date().toLocaleString();


      pdf.images({
        picture1: (await new Img(this.selloImage).build())
      });

      // pdf.add({ image: 'picture1', width: 100, alignment: 'center'}); 
    
      // const titleTxt = new Txt(`Parroquia Santiago Apóstol de Machachi\n`)
      //     .fontSize(18)
      //     .alignment('center')
      //     .bold()
      //     .end;

      //   pdf.add(titleTxt);
  
      //   const title2Txt = new Txt(`Catequesis Parroquial\n\n`)
      //     .fontSize(16)
      //     .alignment('center')
      //     .bold()
      //     .end;
  
      //   pdf.add(title2Txt);
  
      //   const title3Txt = new Txt(`Reporte General de Asistencias\n\n`)
      //   .fontSize(14)
      //   .alignment('center')
      //   .end;
  
      // pdf.add(title3Txt);

      const content = [
        {
          alignment: 'center',
          columns: [
            { image: 'picture1', width: 70, margin:[0,0,-210,0]},  // Imagen a la izquierda
            [
              // Textos a la derecha
              new Txt(`Parroquia Santiago Apóstol de Machachi\n`)
                .fontSize(15)
                .alignment('center')
                .bold()
                .end,
              new Txt(`Catequesis Parroquial\n\n`)
                .fontSize(13)
                .alignment('center')
                .bold()
                .end,
              new Txt(`Reporte General de Asistencias\n\n`)
                .fontSize(11)
                .alignment('center')
                .end,
            ],
          ],
        },
      ];
    
      pdf.add(content);
  
      const initialTxt = new Txt(`Nivel: ${this.Level}\n`)
          .fontSize(10)
          .bold()
          .end;
  
        pdf.add(initialTxt);
  
      const initialTxtLine2 = new Txt(`Horario: ${this.Schedule.weekDay} (${this.Schedule.startTime} - ${this.Schedule.endTime})\n`)
          .fontSize(10)
          .bold()
          .end;
  
        pdf.add(initialTxtLine2);
  
        const initialTxtLine3 = new Txt(`Paralelo: ${this.classroom}\n`)
          .fontSize(10)
          .bold()
          .end;
  
        pdf.add(initialTxtLine3);
  
        if(this.Schedule.id > 6){
          const initialTxtLine4 = new Txt(`Periodo: 2023-2024\n`)
          .fontSize(10)
          .bold()
          .end;
  
          pdf.add(initialTxtLine4);
        }else{
          const initialTxtLine5 = new Txt(`Periodo: 2022-2023\n`)
          .fontSize(10)
          .bold()
          .end;
  
          pdf.add(initialTxtLine5);
        }

        // const principalTeacher = this.teachers.find(teacher => teacher.id === this.courses.principalId);

        // console.log('profesor principal', principalTeacher)

        // if(principalTeacher){
          const initialTxtLine5 = new Txt(`Catequista 1 - Responsable: ${this.teachers[0].name} ${this.teachers[0].lastName}\n\n`)
          .fontSize(10)
          .bold()
          .end;
    
          pdf.add(initialTxtLine5);
    
      // } else {
      //   const initialTxtLine6 = new Txt(`Catequista no asignado\n\n`)
      //     .fontSize(10)
      //     .bold()
      //     .end;
    
      //     pdf.add(initialTxtLine6);
      // }

      //Tablas 
      if(this.fechasAsistencias.length > 0){
      const initialTxtLine7 = new Txt(`Registro de asistencias del curso\n\n`)
          .fontSize(9)
          .bold()
          .end;
  
        pdf.add(initialTxtLine7);

      const content = this.students.map((item, index) => {
        return [
          (index + 1).toString(),
          `${item.lastName.toUpperCase()} ${item.name.toUpperCase()}`,
          ...this.fechasAsistencias.map(fecha => {
            const asistencia = this.asistenciasPorFecha[fecha][item.id];
            // const observacion = this.observacionesPorFecha[fecha] ? this.observacionesPorFecha[fecha][item.id] : '';
            return new Stack([
              new Columns([
                new Txt(asistencia || '').fontSize(8).alignment('center').end,
                // new Txt(observacion || '').fontSize(8).alignment('center').end
              ]).columnGap(0).end
            ]).end
          })
        ];
      });
  
      pdf.add(
        new Table([
          ['N°', 'Alumno', ...this.fechasAsistencias],
          ...content
        ])
        .layout({
          fillColor: (rowIndex) => {
              // row 0 is the header
              if (rowIndex === 0) {
                return '#D0D3D4';
              }
      
              return '#ffffff';
          },
        },
        )
        .fontSize(8)
        .end
      );
      }else{
        const initialTxtLine8 = new Txt(`\n No existe datos de asistencias registradas\n\n`)
          .fontSize(9)
          .bold()
          .end;
  
        pdf.add(initialTxtLine8);
      }


      //Tabla de justificaciones
    if(this.justificaciones.length > 0){
      const initialTxtLine9 = new Txt(`\n Registro de justificaciones con observaciones\n\n`)
          .fontSize(9)
          .bold()
          .end;
  
        pdf.add(initialTxtLine9);

      const justifications = this.studentsWithJustifications.map((item, index) => {
        return [
          (index + 1).toString(),
          `${item.lastName.toUpperCase()} ${item.name.toUpperCase()}`,
          ...this.justificaciones.map(fecha => {
            const observacion = this.observacionesPorFecha[fecha] ? this.observacionesPorFecha[fecha][item.id] : '';
            return new Stack([
              new Columns([
                 new Txt(observacion || '').fontSize(8).alignment('center').end
              ]).columnGap(0).end
            ]).end
          })
        ];
      });

      const columnWidths = [15, 'auto'];

      // Agrega el ancho para cada fecha
            this.justificaciones.forEach(fecha => {
           columnWidths.push(80); // Ajusta el ancho según tus necesidades
          });
  
      pdf.add(
        new Table([
          ['N°', 'Alumno', ...this.justificaciones],
          ...justifications
        ])
        .layout({
          fillColor: (rowIndex) => {
              // row 0 is the header
              if (rowIndex === 0) {
                return '#D0D3D4';
              }
      
              return '#ffffff';
          },
        },
        )
        .widths(columnWidths)
        .fontSize(8)
        .end
      );
    }else{
      const initialTxtLine10 = new Txt(`\n No se registran justificaciones\n\n`)
          .fontSize(9)
          .bold()
          .end;
  
        pdf.add(initialTxtLine10);
    }

      //footer 
      pdf.footer(
        new Txt(`Reporte generado por el Sistema de Gestión de Catequesis - Despacho Parroquial/Coordinación, documento oficial - ${currentDateTime}`)
          .alignment('center')
          .fontSize(8)
          .italics()
          .end
      );

      const pdfName = `Reporte_Asistencia_admin_${this.Level}_${this.classroom}.pdf`;
      // pdf.create().download(pdfName);
      if(action === 'download'){
        let timerInterval;
        Swal.fire({
          title: "Generando reporte",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            pdf.create().download(pdfName);
          }
        });
        
      }else if(action === 'print'){
        pdf.create().print();
      }

    } else {
      Swal.fire({
        icon: 'error',
        text: 'Debe generar primero la lista',
        confirmButtonColor: '#1D71B8'
      })
    }
  }



}
