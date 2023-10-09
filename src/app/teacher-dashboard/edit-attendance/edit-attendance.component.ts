import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { faSave, faTrash, faListCheck, faX, faCalendarDays, faEdit, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { CheckboxControlValueAccessor, FormControl, FormGroup } from '@angular/forms';
import { NgbDateStruct, NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { List } from 'pdfmake-wrapper/lib/definitions/list/list';

interface Person {
  id: number;
  name: string;
  checkboxState: 'checked' | 'unchecked' | 'indeterminate';
}


@Component({
  selector: 'app-edit-attendance',
  templateUrl: './edit-attendance.component.html',
  styleUrls: ['./edit-attendance.component.css']
})
export class EditAttendanceComponent implements OnInit {

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
  faArrowAltCircleLeft = faArrowAltCircleLeft;
  currentD = new Date();
  model: NgbDateStruct;
  model1: NgbDateStruct;
	date: { year: number; month: number };
  marcarAsistencia = false;
  alumno: any;
  courseId: any;

  name_course: any;
  name_level: any;

  mostrarBotonseleccionar: boolean = true;
  mostrarBotondeseleccion: boolean = false;
 
  List: number[] = [];
  ListJustification: number[] = [];
  selectedStudentIds: any;
  IDStudents: any;
  edit_date: any;
  justifyStudentsId: any;
  IDStudentsJustify: any;
  

  constructor( private ApiService: ApiService,
    private calendar: NgbCalendar,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {

    this.activateRoute.params.subscribe(params => {
      console.log(parseInt(params['id']))
      this.courseId = parseInt(params['id']),
      this.edit_date =(params['date'])
    })

    this.misCursos();
    this.consultar_asistencia();
    this.alumno = false;
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

    this.listado()

  } 

  async listado(){
   
    const filtercourse = this.courses.filter(
      (course) => this.courseId === course.id
    );


    this.students = filtercourse[0].Students

    console.log('Estudiantes', this.students)

    this.name_course = filtercourse[0].name
    this.name_level =filtercourse[0].Schedule.Level.name


      // if(this.students){
      //   const Toast = Swal.mixin({
      //     toast: true,
      //     position: 'top-end',
      //     showConfirmButton: false,
      //     timer: 2000,
      //     timerProgressBar: true,
      //   })
      //    Toast.fire({
      //     icon: 'success',
      //     title: 'Preparando listado'
      //   })
      // }
  }

   isDisabled = (date: NgbDate, current: { month: number; year: number }) => date.month !== current.month;
   isWeekend = (date: NgbDate) => this.calendar.getWeekday(date) <= 5;
   isWeek = (date: NgbDate) => this.calendar.getWeekday(date) <= 5;

   toggleCheckbox(person: Person) {
    if (person.checkboxState === 'checked') {
      person.checkboxState = 'unchecked';
    } else if (person.checkboxState === 'unchecked') {
      person.checkboxState = 'indeterminate';
    } else {
      person.checkboxState = 'checked';
    }
  }


  seleccionarTodos() {
    for (this.alumno of this.students) {
      this.alumno.value = true;
      if (!this.isSelected(this.alumno.id)) {
        this.List.push(this.alumno.id);
      }
    }
    console.log('todos los alumnos seleccionados:', this.List)
    this.mostrarBotonseleccionar = false;
    this.mostrarBotondeseleccion = true;

  }

  DesmarcarTodos() {
    for (this.alumno of this.students) {
      this.alumno.value = false;
      this.List = this.List.filter(id => id !== this.alumno.id);
    }
    console.log('todos los alumnos quitados:', this.List)

    this.mostrarBotonseleccionar = true;
    this.mostrarBotondeseleccion = false;
  }

  excluirMutuamente(checkboxSeleccionado, otroCheckbox) {
    if (checkboxSeleccionado) {
      otroCheckbox = false; // Desmarca el otro checkbox si se selecciona el actual
    }
  }

  toggleAsistencia(studentId: number) {
    if (this.isSelected(studentId)) {
      // Si el estudiante ya estaba seleccionado, lo eliminamos del arreglo
      this.List = this.List.filter(id => id !== studentId);
    } else {
      // Si el estudiante no estaba seleccionado, lo agregamos al arreglo
      this.List.push(studentId);
      this.toastr.info('Se ha colocado asistencia a un estudiante');
    }
    console.log('Estudiante agregado:', this.List)
  }

  isSelected(studentId: number): boolean {
    // Verificamos si un estudiante está en el arreglo de estudiantes seleccionados
    return this.List.includes(studentId);
  }

  toggleJustification(studentId: number) {
    if (this.isSelectedJustification(studentId)) {
      // Si el estudiante ya estaba seleccionado, lo eliminamos del arreglo
      this.ListJustification = this.ListJustification.filter(id => id !== studentId);
    } else {
      // Si el estudiante no estaba seleccionado, lo agregamos al arreglo
      this.ListJustification.push(studentId);
      this.toastr.warning('Se ha Justificado a un estudiante');
    }
    console.log('Estudiante Justificado:', this.ListJustification)
  }

  isSelectedJustification(studentId: number): boolean {
    // Verificamos si un estudiante está en el arreglo de estudiantes seleccionados
    return this.ListJustification.includes(studentId);
  }


  formatDate(date: NgbDateStruct): string {
    if (date) {
      const year = date.year.toString().padStart(4, '0');
      const month = date.month.toString().padStart(2, '0');
      const day = date.day.toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    return ''; // Manejo de caso en que date sea nulo o indefinido
  }


 async EditarAsistencia() {
    
    const data = {
      students: this.List,
      justifiedStudents: this.ListJustification
    }

    console.log('array de envio:', data)

    const resp = await this.ApiService.Update_Assistance(this.courseId, this.edit_date, data)
    console.log(resp)

    if (resp.correctProcess === true) {

      const myTimeout = setTimeout(() => {

        Swal.fire({
          icon: 'success',
          title: 'Se ha edita la Asistencia con éxito',
          text: 'Edición del día:' + ' ' + this.edit_date + ' ' + this.name_level + '-' + this.name_course,
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#1D71B8'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/teacher/mycourses'])
          }
        })

      }, 1000);
      myTimeout;
    }

  }

 async consultar_asistencia(){

    const resp = await this.ApiService.get_Assistance(this.courseId, this.edit_date)
    console.log(resp)

    this.selectedStudentIds = resp.data.assistance.Students

    this.IDStudents = this.selectedStudentIds.map(id => id.id)

    if(resp.data.justification){
      this.justifyStudentsId = resp.data.justification.Students
    
      this.IDStudentsJustify = this.justifyStudentsId.map(id => id.id)
    }else{
      this.IDStudentsJustify = [];
    }

    this.List = this.IDStudents
    this.ListJustification = this.IDStudentsJustify

    console.log(this.ListJustification)
  }


  checkboxDeberiaEstarMarcado(id: number): boolean {
    if (this.IDStudents != null) {
      return this.IDStudents.includes(id);
    } else {
      return false; 
    }
  }

  // checkboxjustification(id: number): boolean {
  //   const studentsJustify = this.IDStudentsJustify ?? [];
  //   return studentsJustify.includes(id);
  // }

  checkboxjustification(id: number): boolean {
    if (this.IDStudentsJustify != null && Array.isArray(this.IDStudentsJustify)) {
      return this.IDStudentsJustify.includes(id);
    } else {
      return false; // Devuelve false si this.IDStudentsJustify es null o no es un array
    }
  }
  
  



  async consultar_asistencia1(event: any){

    const fecha_editar = this.formatDate(this.model1);
    console.log('Fecha seleccionada en formato yyyy-mm-dd:', fecha_editar);

    const resp = await this.ApiService.get_Assistance(this.courseId, fecha_editar)
    console.log(resp)

    if(resp.correctProcess === true){

      const myTimeout = setTimeout(() => {
      console.log(event.target.name)
        Swal.fire({
          icon: 'success',
          title: 'Se ha encontrado la asistencia del día seleccionado',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#1D71B8'
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.setItem("en", event.target.name)
            this.router.navigate(['/teacher/edit-attendance/', event.target.name])
          }
        })

      }, 1000);
      myTimeout;
      
    }
    else{
      const myTimeout = setTimeout(() => {

        Swal.fire({
          icon: 'error',
          title: 'Ups',
          text: resp.message,
          confirmButtonText: 'Ok',
          confirmButtonColor: '#1D71B8'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        })

      }, 1000);
      myTimeout;
    } 

  }



  regresar(event: any ){
    console.log(event.target.name)
    localStorage.setItem("en", event.target.name)
    this.router.navigate(['/teacher/attendance/', event.target.name])
  }


}

