import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GuardService } from '../services/guard.service';

@Injectable({
  providedIn: 'root'
})
export class CourseSelectionGuard implements CanActivate {
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.guardService.validateCourseSelection();
  }
  constructor(private guardService: GuardService){}
  
}
