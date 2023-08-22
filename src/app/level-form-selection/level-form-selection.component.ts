import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../services/api.service';
import { datalevel, datashedule, datasheduleYear, LevelResponse } from '../shared/interfaces';

@Component({
  selector: 'app-level-form-selection',
  templateUrl: './level-form-selection.component.html',
  styleUrls: ['./level-form-selection.component.css'],
})
export class LevelFormSelectionComponent implements OnInit {
  
  isMobile = false;
  faUser = faUser;
  shedules: any;
  levels: any;
  current_shedule;

  constructor(
    private router: Router,
    private _apiService:ApiService
  ) { 
    this.shedules = [];
    this.levels = {};
  }

  FormIdentitynumber = new FormGroup(
    {
      identityNumber: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)])
    })

  ngOnInit(): void {
    this.checkIfMobile();
    this.getShedule();
  }

checkIfMobile() {
  if (this.isMobile = window.innerWidth < 1024){
    
    Swal.fire({
      title: '¿Desea continuar?',
      text: "Parece que estas usando un dispositivo móvil, es importante tener en cuenta que para realizar un proceso adecuado es mejor hacerlo desde un computador, si deseas continuar, puedes hacerlo bajo tu responsabilidad",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, deseo continuar',
      cancelButtonText: 'Salir',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.DismissReason.cancel
      } else if (
        result.dismiss 
      ) {
        this.router.navigate(['/home'])
      }
    })
  } 

  
}

@HostListener('window:resize', ['$event'])
onResize(event) {
  this.checkIfMobile();
}

reset_Form(){
  this.FormIdentitynumber.reset()
}

getShedule(){
  this._apiService.getShedulebyYear().subscribe((resp: any) => {
    console.log(resp),
    this.shedules = resp.data;
    console.log(this.shedules)
  })
}

verify_level(){
  const idbusqueda = 1;
  const auxshedule = this.shedules.find(
    (sheduleid) => sheduleid.Level.order === idbusqueda
  );
  
  if (auxshedule) {
    console.log('Objeto encontrado:', auxshedule);
    this.current_shedule = auxshedule
    if(this.current_shedule.id === 7){
      localStorage.setItem("cs", '7')
      this.router.navigate(['/course_selection', 7]) 
    }
    else{
      Swal.fire({
        icon: 'error',
        text: 'No puede ingresar',
      })
    }
  } else {
    console.log('Objeto no encontrado');
  }
}

consult_courses(event: any){
  if(this.current_shedule.id === 7){
    localStorage.setItem("cs", '7')
    this.router.navigate(['/course_selection', 7]) 
  }
  else{
    Swal.fire({
      icon: 'error',
      text: 'No puede ingresar',
    })
  }
}




}
