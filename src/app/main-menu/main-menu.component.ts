import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faArrowDownUpAcrossLine, faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  body: any;
  faUser = faUser;
  faLock = faLock;

  constructor( private router: Router) { }

  FormloginTeacher = new FormGroup(
    {
      user: new FormControl('', Validators.required),
      pwd: new FormControl('', Validators.required)
    }
  )

  ngOnInit(): void {
    // Swal.fire({
    //   //imageUrl: 'https://scontent.fuio1-1.fna.fbcdn.net/v/t39.30808-6/305201453_2961354640825450_1370958178437415819_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=730e14&_nc_eui2=AeEXdih1eY3kuzFNextENpE2G0vUT--zW88bS9RP77NbzzF16rb_kiuy22DSjpbwI3dG2j4Ix8ckR54OcWOC4GDJ&_nc_ohc=miaHdk6pWIsAX-55ZFA&_nc_ht=scontent.fuio1-1.fna&oh=00_AT_mxH0YjbKK6gRAwyvm_n-NE8_13j3PkddkkhZENqp8qA&oe=631B6A91',
    //   imageUrl: 'https://scontent.fuio1-2.fna.fbcdn.net/v/t39.30808-6/307765613_2972446273049620_6199640790180658934_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=730e14&_nc_eui2=AeFOj5twjaWi2WqNjBDdqRsbClD-8j_LfDYKUP7yP8t8NqxT340qFhKVt-mFuIOlU_vrQ8MYEPMQGBQq873Ca2fj&_nc_ohc=1OXiud46N5EAX9d7HA5&_nc_ht=scontent.fuio1-2.fna&oh=00_AT9mY-KwOsZ0zPND3Cgdm1O23h48RBO1OU_dESXRZumz_A&oe=632E6782',
    //   imageWidth: 500,
    //   imageHeight: 500,
    //   imageAlt: 'Custom image',
    //   showCloseButton: true,
    //   showConfirmButton: false
    // })
  }

  anunce(){
    Swal.fire({
      icon: 'info',
      title: '¡Culminaron los días de Matriculación online!',
      text: 'Debe acudir al Despacho Parroquial, en horario de oficina, si se desea realizar algún proceso referente a la Matriculación',
      confirmButtonColor: '#1D71B8'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/home'])
      }
    })
  }

  inicio_sesion_teacher(){
    if(this.FormloginTeacher.valid){
          this.body = {
           usuario : this.FormloginTeacher.get('user')?.value,
           password : this.FormloginTeacher.get('pwd')?.value,
         }

  
         if (this.body.usuario === 'catequesis2022' && this.body.password === 'catequista2022') {
          const myTimeout = setTimeout(async() => {

            const Toast = Swal.mixin({
              toast: false,
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
            })
            await Toast.fire({
              icon: 'success',
              title: 'Iniciando Sesión'
            })
            localStorage.setItem('lgc', '1')
            this.router.navigate(['/teacher-form'])
          }, 1000);
          myTimeout;
         } else {
          Swal.fire({
            icon: 'error',
            title: 'Datos Ingresados son incorrectos',
            confirmButtonColor: '#1D71B8'
          })
         this.reset_Form()
         }
      
      // console.log(this.body);
  }
  }

  reset_Form(){
      this.FormloginTeacher.reset()
  }
}