import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GuardService } from '../services/guard.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherFormGuard implements CanActivate {

  constructor(private guardService: GuardService){}
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.guardService.validatelogteacher();
  }
  
}
