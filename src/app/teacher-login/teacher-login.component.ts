import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-teacher-login',
  templateUrl: './teacher-login.component.html',
  styleUrls: ['./teacher-login.component.css']
})
export class TeacherLoginComponent implements OnInit {

  faEye = faEye;
  faEyeSlash = faEyeSlash;
  type: string = "password";
  isText: boolean = false;
  eyeIcon = faEyeSlash;

  constructor(
    private authservice: AuthService,
    private router: Router ) { }

  user_teacher_Form = new FormGroup(
    {
      user: new FormControl('', Validators.required),
      pwd: new FormControl('', Validators.required)
    }
  )

  recover_password_Form = new FormGroup(
    {
      identityNumber: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)])
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

  reset_Form(){
    this.recover_password_Form.reset()
}

reset_user(event: any){
  console.log(event.target.name)
  localStorage.setItem("type", event.target.name)
  this.router.navigate(['/recover-data', event.target.name])
  
}
reset_pwd(event: any){
  console.log(event.target.name)
  localStorage.setItem("type", event.target.name)
  this.router.navigate(['/recover-data', event.target.name])
}

hideshowPass() {
  this.isText = true; // Cambiar a texto visible temporalmente
  this.type = "text";
  this.eyeIcon = faEye;

  // Después de un cierto tiempo (por ejemplo, 1 segundos), vuelve a ocultar la contraseña
  setTimeout(() => {
    this.isText = false;
    this.type = "password";
    this.eyeIcon = faEyeSlash;
  }, 1000); // 1000 milisegundos (1 segundos)
}

}
