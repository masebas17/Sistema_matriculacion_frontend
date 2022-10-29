import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { __values } from 'tslib';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-recover-user',
  templateUrl: './recover-user.component.html',
  styleUrls: ['./recover-user.component.css']
})
export class RecoverUserComponent implements OnInit {

  teacherId: any;
  user: any;

  constructor(private router: Router,
    private apiservice: ApiService,
    private activateRoute: ActivatedRoute) { }

  TeacherForm = new FormGroup(
    {
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(8)]),
      Confirmpassword: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(8)])
    }
    
  ) 

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      console.log(parseInt(params['id']))
      this.teacherId = parseInt(params['id'])
    })


    Swal.fire({
      icon: 'warning',
      title: '¡Importante!',
      text: 'Si olvidaste tu usuario es necesario la recuparación de usuario y contraseña, debes tener en cuenta que el usuario puede ser cualquier dato que sea facil de recordar y puede contener letras o números, la contraseña debe contener minimo 8 caractéres y puede contener también caractéres especiales',
      confirmButtonColor: '#1D71B8'
    })
  }

  

  async reset_user_teacher(values: any){
    this.user = values;
    const resp = await this.apiservice.reset_data_user_teacher(this.teacherId, this.user)

    console.log(resp)

    if(resp){

      const myTimeout = setTimeout(() => {

        Swal.fire({
          icon: 'success',
          title: 'Se ha Actualizado su Usuario y Contraseña con éxito',
          confirmButtonColor: '#1D71B8'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/teacher-login'])
            localStorage.clear()
          }
        })
  
      }, 1000);
      myTimeout;
    }
    else {
      
    }
  }

  reset_local(){
    localStorage.clear()
  }

}
