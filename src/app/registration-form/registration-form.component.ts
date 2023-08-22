import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  datos_of_students: any;
  current_level;
  aux_level;
  levels: any;
  validDate;
  

  constructor(
    private router: Router,
    private _ApiService: ApiService
  ) {
    this.levels = [];
   }

  FormIdentitynumber = new FormGroup(
    {
      identityNumber: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)])
    })

  ngOnInit(): void {
    this.getShedule()
  }

  verificar(){
  
    const myTimeout = setTimeout(async() => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        color:'#3d9b24',
        width: 600,
        padding: '2em',
        timer: 5000,
        timerProgressBar: true,
      })
      
      await Toast.fire({
        icon: 'success',
        title: 'Validando la información del alumno'
      })
      this.router.navigate(['/registration-form'])
    }, 1000)
    myTimeout;
}

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
        this.verificar_datos(resp.data)
    if(!this.validDate){
          Swal.fire({
            icon: 'error',
            text: 'Usted no esta habilitado para la matriculación en este día, revise las fechas correspondientes',
          })
          this.router.navigate(['/home'])
        }else{
    if(resp.data.Course.Schedule.id > 6 ){
      await Swal.fire({
        icon: 'error',
        text: 'Usted ya se encuentra matriculado',
      })
      this.router.navigate(['/home'])
    }else{
        await Toast.fire({
          icon: 'success',
          title: 'Datos del Estudiante encontrados',
          text:' Verificando el estado de matriculación'
        })
        this.datos_of_students = resp.data
        console.log(this.datos_of_students)
        
      }
      }
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
    console.log('Objeto encontrado:', auxlevel);
    this.current_level = auxlevel
  } else {
    console.log('Objeto no encontrado');
  }

  const auxDate = new Date();

  console.log(auxDate)
  console.log(new Date(this.current_level.Level.enrollmentStart))
  console.log(new Date(this.current_level.Level.enrollmentEnd))

  if (auxDate >= new Date(this.current_level.Level.enrollmentStart) && auxDate <= new Date(this.current_level.Level.enrollmentEnd)) {
    this.validDate = true
  }else{
  this.validDate = false
  }
}


consult_courses(event: any){
  if(this.current_level.id != 0){
    localStorage.setItem("cs", event.target.name)
    this.router.navigate(['/classroom_selection', event.target.name]) 
  }
  else{
    Swal.fire({
      icon: 'error',
      text: 'Debe seleccionar un horario',
    })
  }
}



}
