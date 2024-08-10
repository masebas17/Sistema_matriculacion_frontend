import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-verify-information-students',
  templateUrl: './verify-information-students.component.html',
  styleUrls: ['./verify-information-students.component.css']
})
export class VerifyInformationStudentsComponent implements OnInit {

  datos_of_students: any;
  public formattedDate: string;

  constructor(private _ApiService: ApiService,
    private activateRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    const identityNumber = this.activateRoute.snapshot.paramMap.get('identityNumber');
    this.consultar(identityNumber)
  }


  consultar(identityNumber: string){
    this._ApiService.getStudent(identityNumber).subscribe((resp: any) =>{

      if (resp) {
        this.datos_of_students = resp.data.student
        // console.log(this.datos_of_students) 
        this.formattedDate = this.formatUpdatedAt(this.datos_of_students.updatedAt);
    }})
  }

  formatUpdatedAt(dateStr: string): string {
    if (dateStr) {
      const date = new Date(dateStr);
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'America/Guayaquil' // Ajusta la zona horaria si es necesario
      };
      const formatter = new Intl.DateTimeFormat('es-ES', options);
      return formatter.format(date);
    }
    return ''; // Manejo de caso en que dateStr sea nulo o indefinido
  }

}
