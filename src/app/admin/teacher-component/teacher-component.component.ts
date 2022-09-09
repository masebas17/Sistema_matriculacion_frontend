import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { dataTeacher } from 'src/app/shared/interfaces';
import Swal from 'sweetalert2';
import { __values } from 'tslib';

@Component({
  selector: 'app-teacher-component',
  templateUrl: './teacher-component.component.html',
  styleUrls: ['./teacher-component.component.css']
})
export class TeacherComponentComponent implements OnInit {
  teacher: dataTeacher;
  constructor( private apiServices: ApiService, private router: Router) { 
    
  }
  
  ngOnInit(): void {
    
  }

  FormTeacher = new FormGroup (
    {
    lastName: new FormControl('',Validators.required),
    name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(10)]))

    }
  )

  async enroll_teacher(values: any){
    this.teacher = values
    const resp = await this.apiServices.enrollemnt_Teacher_admin(this.teacher)
    console.log(resp)

    if (resp) {

      const myTimeout = setTimeout(() => {

        Swal.fire({
          icon: 'success',
          title: 'Registro Exitos',
          text: 'Se ha ingresadp un nuevo catequista con éxito',
          confirmButtonColor: '#1D71B8'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        })

      }, 1000);
      myTimeout;
    }
    else {
      this.router.navigate(['/admin'])
    }
  }
  }


