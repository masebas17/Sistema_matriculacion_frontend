import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    Swal.fire({
      //imageUrl: 'https://scontent.fuio1-1.fna.fbcdn.net/v/t39.30808-6/305201453_2961354640825450_1370958178437415819_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=730e14&_nc_eui2=AeEXdih1eY3kuzFNextENpE2G0vUT--zW88bS9RP77NbzzF16rb_kiuy22DSjpbwI3dG2j4Ix8ckR54OcWOC4GDJ&_nc_ohc=miaHdk6pWIsAX-55ZFA&_nc_ht=scontent.fuio1-1.fna&oh=00_AT_mxH0YjbKK6gRAwyvm_n-NE8_13j3PkddkkhZENqp8qA&oe=631B6A91',
      imageUrl: 'https://scontent.fuio1-2.fna.fbcdn.net/v/t39.30808-6/307765613_2972446273049620_6199640790180658934_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=730e14&_nc_eui2=AeFOj5twjaWi2WqNjBDdqRsbClD-8j_LfDYKUP7yP8t8NqxT340qFhKVt-mFuIOlU_vrQ8MYEPMQGBQq873Ca2fj&_nc_ohc=1OXiud46N5EAX9d7HA5&_nc_ht=scontent.fuio1-2.fna&oh=00_AT9mY-KwOsZ0zPND3Cgdm1O23h48RBO1OU_dESXRZumz_A&oe=632E6782',
      imageWidth: 500,
      imageHeight: 500,
      imageAlt: 'Custom image',
      showCloseButton: true,
      showConfirmButton: false
    })
  }

}
