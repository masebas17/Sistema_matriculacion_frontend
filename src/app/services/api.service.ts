import { Injectable } from '@angular/core';
import{ HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { datacourses, datalevel, datashedule, dataStudent, LevelResponse, Students } from '../shared/interfaces';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  userUrl = 'https://sistema-matriculacion.herokuapp.com';
  apiUrl = 'https://sistema-matriculacion.herokuapp.com';

  getlevel(): Observable<datalevel[]> {
    return this.http.get<datalevel[]>(`${this.apiUrl}/api/levels`)
  }

  getShedule(): Observable<datashedule[]>{
    return this.http.get<datashedule[]>(`${this.apiUrl}/api/schedules`)
  }

  getCourses(id: any): Observable<datacourses[]>{
    return this.http.get<datacourses[]>(`${this.apiUrl}/api/courses/schedule/`+ id)
  }

  enrollemnt(Student: dataStudent): Observable<dataStudent[]>{
    return this.http.post<dataStudent[]>(`${this.apiUrl}/api/students`, Student) 
  }

}
