import { Injectable } from '@angular/core';
import{ HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { datacourses, datalevel, datashedule, dataStudent, dataTeacher, LevelResponse, Students } from '../shared/interfaces';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  token: any = null;

  constructor(private http: HttpClient) { }

  userUrl = 'https://sistema-matriculacion.herokuapp.com';
  apiUrl = 'https://sistema-matriculacion.herokuapp.com';


  getToken() {
    this.token = localStorage.getItem('jwt') || null;
  }

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

  async getCoursesbyid(id: any){
    const options = {
      headers: new HttpHeaders({['x-token']: localStorage.getItem('jwt')})
  };
    const response: any = await this.http
      .get(`${this.apiUrl}/api/courses/schedule/` + id , options)
      .toPromise();
    //Guarda el token en el local storage al iniciar sesion correctamente
    return response;
  }



  async getschedules_from_admin() {
    const options = {
      headers: new HttpHeaders({['x-token']: localStorage.getItem('jwt')})
  };
    const response: any = await this.http
      .get(`${this.apiUrl}/api/schedules/all`, options)
      .toPromise();
    //Guarda el token en el local storage al iniciar sesion correctamente
    return response;
  }

  async getcourses_from_admin(id: any) {
    const options = {
      headers: new HttpHeaders({['x-token']: localStorage.getItem('jwt')})
  };
    const response: any = await this.http
      .get(`${this.apiUrl}/api/courses/schedule/` + id + '/count', options)
      .toPromise();
    //Guarda el token en el local storage al iniciar sesion correctamente
    return response;
  }

  async enrollemnt_admin(Student: dataStudent){
    const resp: any = await this.http.post(`${this.apiUrl}/api/students`, Student).toPromise() 
    return resp
  }

  async enrollemnt_Teacher_admin(teacher: dataTeacher){
    const options = {
      headers: new HttpHeaders({['x-token']: localStorage.getItem('jwt')})
  };
    const resp: any = await this.http.post(`${this.apiUrl}/api/teachers`, teacher, options).toPromise() 
    return resp
  }
  
}
