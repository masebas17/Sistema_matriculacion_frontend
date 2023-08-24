import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor() { }

  async presentErrorAlert(error: any) {
    // Si status del error es > 400 eso quiere decir que el contenido del error proviene del backend de tipo ResponseDto
    console.log(error)
    if (error.status >= 400) {
      await Swal.fire({
        icon: 'error',
        text: error.error.message,
        confirmButtonColor: '#00448e',
      });
    } else {
      // Caso contrario, si es un error de coneccion y otros, se envia esta alerta por defecto
      await Swal.fire({
        icon: 'error',
        title: 'Algo ha salido mal',
        text: 'Inténtalo más tarde o contacta al administrador',
        confirmButtonColor: '#00448e',
      });
    }
  }

  //? Presenta una alerta con el texto cargando... y un spinner
  async presentLoader() {
    Swal.fire({
      title: 'Cargando',
      width: 200,
    });
    Swal.showLoading();
  }

  //? Se cierra la alerta de cargando...
  async closeLoader() {
    Swal.close();
  }
}
