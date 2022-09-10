import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { dataStudent } from 'src/app/shared/interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
  opcionSeleccionada: number = 0;
  seleccion_curso: number = 0;
  verSeleccion: number = 0;
  verSeleccion_curso: number = 0;
  shedules: any;
  courses: any;
  student: dataStudent = {};
  datos_of_students: dataStudent = {};
  StudentId: number;
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  fecha = null

  constructor(private _apiService: ApiService, private router: Router) { 
    this.shedules = {};
    this.courses = [];
  }

  FormCI = new FormGroup(
    {
      CI: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)])
    }
  )

  Formstudent = new FormGroup(
    {
      identity: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
      lastName: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      parentName: new FormControl('', Validators.required),
      phone1: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(10)])),
      email: new FormControl('', Validators.email),
      address: new FormControl('', Validators.required),
      baptized: new FormControl('', Validators.required),
      disability: new FormControl('', Validators.required)
    }
  )
  ngOnInit(): void {
  }

  consultar(){
    this._apiService.getStudent(this.FormCI.get("CI").value).subscribe((resp: any) =>{
      console.log(resp.data)
      this.student = resp.data
  if (this.student) {

    const myTimeout = setTimeout(() => {

      Swal.fire({
        icon: 'success',
        title: 'Se ha encontrado un estudiante',
        confirmButtonColor: '#1D71B8'
      }).then((result) => {
        if (result.isConfirmed) {
          this.editar()
        }
      })

    }, 1000);
    myTimeout;
  }
  else {
    this.router.navigate(['/admin'])
  }
})
}

  
editar(){

  this.Formstudent.setValue({

      identity: this.student.identityNumber,
      lastName: this.student.lastName,
      name: this.student.name,
      age: this.student.age,
      parentName: this.student.parentName,
      phone1: this.student.phone1,
      email: this.student.email,
      address: this.student.address,
      baptized: this.student.baptized,
      disability: this.student.disability
  })

}

delete(){
  
  Swal.fire({
    title: 'Eliminar Registro',
    text: "¿Está seguro que desea eliminar a este estudiante? ",
    icon: 'warning',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#28a745',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminar'
  }).then(async (result) => {
    if (result.isConfirmed) {
      
      await this._apiService.delete_student(this.student.id)
      await Swal.fire({
        title: 'Eliminado',
        text:'Se ha eliminado un registro de estudiante',
        icon:'success',
        timer: 3000,
        showConfirmButton: false,
        }
      )
      window.location.reload()
    }
  })
  
}


async edit_student(values: any){


  this.datos_of_students = values
  console.log(this.datos_of_students);
  const resp = await this._apiService.edit_student(this.student.id, this.datos_of_students)

  if(resp){
    await Swal.fire({
      icon: 'success',
      title: 'Se realizaron los cambios en el registro',
      confirmButtonColor: '#1D71B8',
      timer: 3000,
      showConfirmButton: false
    })
    window.location.reload()
  }
}

}
