import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { datalevel, datashedule, datacourses } from '../shared/interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-course-selection',
  templateUrl: './course-selection.component.html',
  styleUrls: ['./course-selection.component.css']
})
export class CourseSelectionComponent implements OnInit {
  
  tittle = 'client';
  course: any;
  sheduleId: number = 0;
  course_selection: any;
  

  constructor(private _apiService:ApiService,
    private _router: Router,
    private activateRoute: ActivatedRoute ) {
    this.course = {}
   }

  ngOnInit(): void {
    this.activateRoute.params.subscribe( params =>{
      console.log(parseInt(params['id']))
      this.sheduleId = parseInt(params['id'])
    })
    this.getCourse()
    setTimeout(() => {
      this.anunce();
    }, 1000);
  }

  getCourse(){
    this._apiService.getCourses(this.sheduleId).subscribe((resp: datacourses[]) =>
    {
      console.log(resp),
      this.course = resp
    })
  }

  enroll(event: any){
    console.log(event.target.name)
    localStorage.setItem("en", event.target.name)
    this._router.navigate(['/enrollment', event.target.name])
    
  }

  async anunce(){
   await Swal.fire({
      icon: 'info',
      text: 'Estimado alumno/a, a continuación el proceso nos muestra los cursos disponibles para matricularnos, es importante que conozcas que el curso que se escoja al finalizar el proceso puede cambiar, esto es debido a que el sistema verifica al terminar las matrículas parámetros como la edad o si existe alguna limitante de imprevisto como el espacio físico.',
      confirmButtonColor: '#1D71B8',
      input: "checkbox",
      inputValue: 1,
      inputPlaceholder: `
        Estoy de acuerdo con los términos y condiciones
      `,
      confirmButtonText: `
        Continue&nbsp;<i class="fa fa-arrow-right"></i>
      `,
      inputValidator: (result) => {
        return !result && "You need to agree with T&C";
      }
    });
  }

}
