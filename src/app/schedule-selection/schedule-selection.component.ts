import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { datalevel, datashedule, LevelResponse } from '../shared/interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-schedule-selection',
  templateUrl: './schedule-selection.component.html',
  styleUrls: ['./schedule-selection.component.css']
})
export class ScheduleSelectionComponent implements OnInit {

  tittle = 'client';
  levels: any;
  shedules: any;
  datos_select: any;
  opcionSeleccionada: number = 0;
  verSeleccion: number = 0;
  
  

  constructor(private _apiService:ApiService,
    private _router: Router,
    private Forms: FormBuilder) {
    this.levels = {};
    this.shedules = {};
    this.datos_select ={};
   }

  

  ngOnInit(): void {
    this.getList()
    this.getShedule()
  }

  getList(){
    this._apiService.getlevel().subscribe((resp: datalevel[])  =>{
      console.log(resp),
      this.levels = resp;
      console.log(this.levels.data.name)
   })
  }

  getShedule(){
    this._apiService.getShedule().subscribe((resp: datashedule[]) =>{
      console.log(resp),
      this.shedules = resp;
    })
  }

  consult_courses(event: any){
    if(this.verSeleccion != 0){
      localStorage.setItem("cs", event.target.name)
      this._router.navigate(['/course_selection', event.target.name]) 
    }
    else{
      Swal.fire({
        icon: 'error',
        text: 'Debe seleccionar un horario',
      })
    }
  }

  capturar(){
    this.verSeleccion = this.opcionSeleccionada
    console.log(this.verSeleccion)
  }

}
