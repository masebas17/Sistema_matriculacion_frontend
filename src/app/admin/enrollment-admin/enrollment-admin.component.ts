import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { datacourses } from 'src/app/shared/interfaces';
import { DatePipe } from '@angular/common';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { PdfGeneratorService } from 'src/app/services/pdf-generator.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-enrollment-admin',
  templateUrl: './enrollment-admin.component.html',
  styleUrls: ['./enrollment-admin.component.css']
})
export class EnrollmentAdminComponent implements OnInit {

  datos_of_students: any;
  current_level;
  aux_level;
  levels: any;
  validDate;
  course: any;
  seleccion_curso: number = 0;
  verSeleccion_curso;
  student;
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  fecha = null
  formattedDate: string;
  qrCode: any;

  constructor(
    private router: Router,
    private _ApiService: ApiService,
    private pdfGeneratorService: PdfGeneratorService
  ) { 
    this.course = []
  }

  ngOnInit(): void {
    this.getShedule()
  }

  FormIdentitynumber = new FormGroup(
    {
      identityNumber: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)])
    })

  Formstudent = new FormGroup(
      {
        identityNumber: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
        lastName: new FormControl('', Validators.required),
        name: new FormControl('', Validators.required),
        age: new FormControl('', Validators.required),
        parentName: new FormControl('', Validators.required),
        phone1: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(10)])),
        email: new FormControl('', Validators.email),
        address: new FormControl('', Validators.required),
        baptized: new FormControl('', Validators.required),
        disability: new FormControl('', Validators.required),
        aproved: new FormControl('', Validators.required),
        payment: new FormControl('', Validators.required)
      }
    )

  consultar(){
      this._ApiService.getStudent(this.FormIdentitynumber.get("identityNumber").value).subscribe((resp: any) =>{
      
        if (resp) {
          const myTimeout = setTimeout(async() => {
            const Toast = Swal.mixin({
              toast: false,
              position: 'center',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
            })
            this.verificar_datos(resp.data.student)
        if(resp.data.student.Course.Schedule.id > 6 ){
          await Swal.fire({
            icon: 'error',
            text: 'El Usuario ya se encuentra matriculado',
          })
          window.location.reload();
        }else{
    
          if(resp.data.student.aproved === false || resp.data.student.aproved === null ){
            await Swal.fire({
              icon: 'error',
              text: 'El usuario registra nivel del periodo 2022 como reprobado, no tiene permitido matricularse, para levantar impedimentos debe buscar con la cédula y cambiar el estado a "APROBADO" en editar información',
            })
            window.location.reload();
          } else {

            if(resp.data.student.Course.Schedule.id === 6){
              await Swal.fire({
                icon: 'error',
                text: 'El Usuario no puede matricularse porque el último nivel aprobado es confirmación, ya terminó la catequesis',
              })
              window.location.reload();
            }else {
            await Toast.fire({
              icon: 'success',
              title: 'Datos del Estudiante encontrados',
              text:' Verificando el estado de matriculación'
            })
            this.datos_of_students = resp.data.student
            console.log(this.datos_of_students)

            this.Formstudent.patchValue({
    
              lastName: this.datos_of_students.lastName,
              name: this.datos_of_students.name,
              age: this.datos_of_students.age,
              parentName: this.datos_of_students.parentName,
              phone1: this.datos_of_students.phone1,
              email: this.datos_of_students.email,
              address: this.datos_of_students.address,
              payment: null
          })
          } 
          }
          }
          this.getCourse()
        }, 500);
          myTimeout;
        }
        else {
          this.router.navigate(['/home'])
        }
      })
    }
  
      getShedule(){
        this._ApiService.getShedulebyYear().subscribe((resp: any) => {
          console.log(resp),
          this.levels = resp.data;
          console.log(this.levels)
        })
      }
  
      verificar_datos(datos_of_students: any){
        const auxlevel = this.levels.find(
          (level_order) => level_order.Level.order === datos_of_students.Course.Schedule.Level.order + 1 
        );
        
        if (auxlevel) {
          console.log('Objeto encontrado:', auxlevel.id);
          this.current_level = auxlevel
        } else {
          console.log('Objeto no encontrado');
        }
      
      }
      
      async getCourse(){
        const resp = await this._ApiService.getcourses_from_admin(this.current_level.id)
          this.course = resp.data
          console.log(this.course)
          this.seleccion_curso = 0
       }

      capturar_curso(){
        this.verSeleccion_curso = this.seleccion_curso
        console.log(this.verSeleccion_curso)
      }

    async enroll_student(values: any){

        if(this.verSeleccion_curso != 0){
          
        const AuxValue = {
          lastName: values.lastName,
          name: values.name,
          age: values.age,
          parentName: values.parentName,
          phone1: values.phone1,
          email: values.email,
          address: values.address, 
          courseId: this.verSeleccion_curso,
          payment: null,
          aproved: null
      }
    
        console.log(AuxValue)
      
        const resp = await this._ApiService.edit_student(this.datos_of_students.id, AuxValue)
        console.log(resp)
    
        if (resp) {
          this.qrCode = resp.data.qrCode;
          const myTimeout = setTimeout(() => {
    
            Swal.fire({
              icon: 'success',
              title: 'Matrícula Exitosa',
              text: 'se han registrado los datos con éxito',
              confirmButtonText: 'Generar Acta de Compromiso',
              confirmButtonColor: '#1D71B8'
            }).then((result) => {
              if (result.isConfirmed) {
                this._ApiService.getStudent(this.FormIdentitynumber.get("identityNumber").value).subscribe((resp_student: any) =>{
                  console.log(resp_student.data)
                  this.student = resp_student.data.student
                  this.formattedDate = this.formatUpdatedAt(
                    this.student.updatedAt
                  );
                  this.createPDF(false)
                  this.router.navigate(['/admin']);
                })
              }
            })
    
          }, 1000);
          myTimeout;
        }
        else {
          this.router.navigate(['/home'])
        }

      }
    }  
    
    formatUpdatedAt(dateStr: string): string {
      if (dateStr) {
        const date = new Date(dateStr);
        const options: Intl.DateTimeFormatOptions = {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'America/Guayaquil' 
        };
        const formatter = new Intl.DateTimeFormat('es-ES', options);
        return formatter.format(date);
      }
      return ''; 
    }
  
    createPDF(isCopy: boolean) {
      this.pdfGeneratorService.generatePDF(this.student, this.pipe, this.formattedDate, isCopy ? 'copia' : 'original', this.qrCode).subscribe( voucher => {
        const pdf = pdfMake.createPdf(voucher);
        pdf.open();
      })
    }
}
    

