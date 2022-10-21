import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-teacher-login',
  templateUrl: './teacher-login.component.html',
  styleUrls: ['./teacher-login.component.css']
})
export class TeacherLoginComponent implements OnInit {

  constructor(
    private authservice: AuthService,
    private router: Router ) { }

  user_teacher_Form = new FormGroup(
    {
      user: new FormControl('', Validators.required),
      pwd: new FormControl('', Validators.required)
    }
  )

  async iniciar_sesion_teacher(){
    const resp = await this.authservice.login_teacher(this.user_teacher_Form.get('user')?.value, this.user_teacher_Form.get('pwd')?.value)

    console.log(resp)

    if(resp){
      const myTimeout = setTimeout(async() => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer:3000,
          timerProgressBar: true
        })
        await Toast.fire({
          icon: 'success',
          title: 'Iniciando Sesión'
        })
        if(resp.data.user[0] === 'TEACHER'){
          localStorage.setItem('role', resp.data.user[0])
          this.router.navigate(['/teacher/mycourses'])
        }
      }, 1000);
      myTimeout;

    }
  }

  ngOnInit(): void {
  }

}
