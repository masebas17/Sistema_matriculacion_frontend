import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _formbuilder: FormBuilder,
    private _authService: AuthService,
    private activateRoute: ActivatedRoute,
    private router: Router) { }

  userForm = new FormGroup(
    {
      user: new FormControl('', Validators.required),
      pwd: new FormControl('', Validators.required)
    }
  )

  async iniciar_sesion(values: any){
    const resp = await this._authService.login(this.userForm.get("user")?.value , this.userForm.get("pwd")?.value)

    console.log(resp)
    if (resp) {

      const myTimeout = setTimeout(async() => {

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        })
        await Toast.fire({
          icon: 'success',
          title: 'Iniciando Sesión'
        })
        if(resp.data.user[0] === 'ADMIN'){
        localStorage.setItem('role', resp.data.user[0]);
        this.router.navigate(['/admin'])
        }
        if(resp.data.user[0] === 'SUPERVISOR'){
          localStorage.setItem('role', resp.data.user[0]);
          this.router.navigate(['/supervisor'])
          }
      }, 1000);
      myTimeout;
    }
    
  }

  
  
 ngOnInit(): void {
  }

}
