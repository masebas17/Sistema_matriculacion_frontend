import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-level-form-selection',
  templateUrl: './level-form-selection.component.html',
  styleUrls: ['./level-form-selection.component.css'],
})
export class LevelFormSelectionComponent implements OnInit {
  
  isMobile = false;
  faUser = faUser;

  constructor(
    private router: Router
  ) { }

  FormIdentitynumber = new FormGroup(
    {
      identityNumber: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)])
    })

  ngOnInit(): void {
    this.checkIfMobile();
  }

  
async validar(){

  const { value: ipAddress } = await Swal.fire({
    title: 'Ingrese su número de Cédula',
    input: 'text',
    inputValue: '',
    icon: 'info',
    inputPlaceholder: 'Ingrese el número de cédula del alumno',
    showCancelButton: true,
    confirmButtonText: 'Validar los datos',
    confirmButtonColor: '#1D71B8',
    cancelButtonText: 'Salir',
    cancelButtonColor: 'red',
     inputValidator: (value) => {
       const trimmedValue = value.trim();
       if (trimmedValue.length !== 10 || !/^\d{1,10}$/.test(value)) {
         return 'Ingrese un número válido, la cédula contiene 10 dígitos'
       }
       return null;
     }
  })
  
  if (ipAddress) {
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
      this.router.navigate(['/searcher'])
    }, 1000)
    myTimeout;
}
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


}
