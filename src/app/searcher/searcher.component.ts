import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.css']
})
export class SearcherComponent implements OnInit {

  constructor(private _ApiService: ApiService,
    private router: Router) { }

  Form = new FormGroup(
    {
      identityNumber: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)])
    }
  )

  ngOnInit(): void {
  }

  consultar(){
    this._ApiService.getStudent(this.Form.get("identityNumber").value).subscribe((resp: any) =>{
      console.log(resp)
      if (resp) {

        const myTimeout = setTimeout(() => {
          Swal.fire({
            title: 'Datos del Estudiante',
            icon: 'info',
            confirmButtonColor: '#1D71B8',
            html:
              'Cédula de identidad:' + ' '+ resp.data.identityNumber + '<br>' +
              'nombre:' + ' ' + resp.data.lastName + ' ' +resp.data.name +'<br>' +
              'Nivel:' + ' '+ resp.data.Course.Schedule.Level.name +'<br>' +
              'Horario:' + ' ' + resp.data.Course.Schedule.weekDay + ' ' + resp.data.Course.Schedule.startTime + ' ' + '-'+ ' ' + resp.data.Course.Schedule.endTime + '<br>' +
              'Paralelo:' + ' ' + resp.data.Course.name 
          }).then(() => {

              this.router.navigate(['/home'])
          })
        }, 1000);
        myTimeout;
      }
      else {
        this.router.navigate(['/home'])
      }
    })
  }
}
