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
    const currentDate: Date = new Date();
    return this.http.post<datashedule[]>(`${this.apiUrl}/api/schedules/enrollment`, {currentDate})
  }

  getCourses(id: any): Observable<datacourses[]>{
    return this.http.get<datacourses[]>(`${this.apiUrl}/api/courses/schedule/`+ id)
  }
  getcourse(): Observable<datacourses[]>{
    return this.http.get<datacourses[]>(`${this.apiUrl}/api/courses`)
  }

  getStudent(id: any): Observable<dataStudent[]>{
    return this.http.get<dataStudent[]>(`${this.apiUrl}/api/students/`+ id)
  }

 
  async enrollemnt(Student: dataStudent){
    const resp: any = await this.http.post(`${this.apiUrl}/api/students`, Student).toPromise() 
    return resp
  }

}
