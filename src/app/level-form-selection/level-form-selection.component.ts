import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-level-form-selection',
  templateUrl: './level-form-selection.component.html',
  styleUrls: ['./level-form-selection.component.css']
})
export class LevelFormSelectionComponent implements OnInit {
  
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  
async validar(){

  const { value: ipAddress } = await Swal.fire({
    title: 'Ingrese su número de Cédula',
    input: 'number',
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
}
