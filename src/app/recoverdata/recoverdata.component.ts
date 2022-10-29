import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-recoverdata',
  templateUrl: './recoverdata.component.html',
  styleUrls: ['./recoverdata.component.css']
})
export class RecoverdataComponent implements OnInit {
  type: any;
  id_teacher: any;

  constructor( private apiservice: ApiService,
    private router: Router,
    private activateRoute: ActivatedRoute) { }

  recover_password_Form = new FormGroup(
    {
      identityNumber: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)])
    }
  )
  

  async verify_teacher(){
    const resp = await this.apiservice.verify_teacher(this.recover_password_Form.get('identityNumber')?.value)

    console.log(resp)

    if(resp){
      this.id_teacher = resp.data.User.id

      const myTimeout = setTimeout(() => {

        Swal.fire({
          icon: 'success',
          title: 'Se ha verificado la cuenta de Catequista',
          confirmButtonColor: '#1D71B8'
        }).then((result) => {
          if (result.isConfirmed) {
            if(this.type === 'reset_user'){
              localStorage.setItem('rcid', this.id_teacher)
            this.router.navigate(['/recover_user', this.id_teacher])}
            if(this.type === 'reset_password'){
              localStorage.setItem('rcid', this.id_teacher)
              this.router.navigate(['/recover_password', this.id_teacher])}
          }
        })
  
      }, 1000);
      myTimeout;
    }
    else {
      this.router.navigate(['/teacher-login'])
    }
  }


  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      console.log((params['type']))
      this.type = (params['type'])
      console.log(this.type)
  })}

}



