import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { dataStudent } from 'src/app/shared/interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {
  student: dataStudent = {};
  data_student: any;

  
  constructor( private apiService: ApiService,
    private router: Router) { }

  FormCI = new FormGroup(
    {
      CI: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)])
    }
  )

  Formstudent = new FormGroup(
    {
      identityNumber: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)])
    }
  )
  Formpay = new FormGroup(
    {
      pay: new FormControl('', Validators.required)
    }
  )

  ngOnInit(): void {
  }

  consultar(){
    this.apiService.getStudent(this.FormCI.get("CI").value).subscribe((resp: any) =>{
      console.log(resp)

  if (this.student) {

    const myTimeout = setTimeout(() => {

      Swal.fire({
        icon: 'success',
        title: 'Se ha encontrado un estudiante',
        confirmButtonColor: '#1D71B8'
      }).then((result) => {
        if (result.isConfirmed) {
          this.student = resp.data.student
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


async registrar_recibo(){
  this.student.payment = this.Formpay.get('pay').value
  console.log(this.student.payment)
  const resp = await this.apiService.edit_student(this.student.id, this.student)
  console.log(resp)

  if(resp){
    await Swal.fire({
      icon: 'success',
      title: 'Se realizaron los cambios con éxito',
      confirmButtonColor: '#1D71B8'
    })
  }
}

}
