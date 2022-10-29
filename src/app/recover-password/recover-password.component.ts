import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {
  teacherId: any;
  user: any;

  constructor(private router: Router, private activateRoute: ActivatedRoute, private apiservice: ApiService) { }

  TeacherForm = new FormGroup(
    {
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
      text: 'Para recuperar tu contraseña debes ingresar una combinación que sea fácil de recordar y a la vez que tenga una seguridad alta, la contraseña debe contener al menos 8 caracteres y máximo 16',
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
          title: 'Se ha Actualizado su Contraseña con éxito',
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
