import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { find } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-teacher-management',
  templateUrl: './teacher-management.component.html',
  styleUrls: ['./teacher-management.component.css']
})
export class TeacherManagementComponent implements OnInit {
  list_teachers: any;
  faEdit = faEdit;
  faTrash = faTrash;
  searchTerm: string = '';
  teacherId: any;
  data_teacher: any;
  data_of_teacher: any;


  constructor(private _apiService: ApiService ) { }

  ngOnInit(): void {
    this.getTeachers()
  }

  TeacherForm = new FormGroup(
    {
      identityNumber: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
      lastName: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(10)])),
      email: new FormControl('', [Validators.email, Validators.required]),
      address: new FormControl('', Validators.required),
      maritalStatus: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(8)]),
      Confirmpassword: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(8)])
    }
    
  ) 

  async getTeachers(){
    const resp = await this._apiService.get_Teachers()
    this.list_teachers = resp.data;
    console.log(this.list_teachers)
    this.sortTeachersList();
  }

  private sortTeachersList() {
    this.list_teachers.sort((a, b) => {
      // Ordena por apellidos y luego por nombres
      const lastNameComparison = a.lastName.localeCompare(b.lastName);
      if (lastNameComparison === 0) {
        return a.name.localeCompare(b.name);
      }
      return lastNameComparison;
    });
  }

  edit(event: any){
    console.log(event.target.name)
    this.teacherId =  parseInt(event.target.name)

    const findteacher = this.list_teachers.find(
      (teacher) => teacher.id  === this.teacherId
    );

    console.log(findteacher)
    this.data_teacher = findteacher

    console.log("Datos del catequista",this.data_teacher)

   if(this.data_teacher){

    this.TeacherForm.patchValue({
      identityNumber: this.data_teacher.identityNumber,
      lastName: this.data_teacher.lastName,
      name: this.data_teacher.name,
      phone: this.data_teacher.phone,
      email: this.data_teacher.email,
      address: this.data_teacher.address,
      maritalStatus: this.data_teacher.maritalStatus
    })
      
   }
  }


 async editar(values: any){

  this.data_of_teacher = values
  console.log(this.data_of_teacher)
  const resp = await this._apiService.edit_Teachers(this.teacherId, this.data_of_teacher)

  console.log(resp)

  if(resp){
    const myTimeout = setTimeout(() => {

      Swal.fire({
        icon: 'success',
        title: 'Se ha editado con éxito el registro de un catequista',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#1D71B8'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      })

    }, 1000);
    myTimeout;
  }

  }

  delete_teacher(event: any){
  this.teacherId =  parseInt(event.target.name)

    Swal.fire({
      title: 'Eliminar Registro',
      text: "¿Está seguro que desea eliminar a este catequista? ",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        
        await this._apiService.delete_teacher(this.teacherId)
        await Swal.fire({
          title: 'Eliminado',
          text:'Se ha eliminado un registro de un catequista',
          icon:'success',
          timer: 3000,
          showConfirmButton: false,
          }
        )
        window.location.reload()
      }
    })
    
  }

}
