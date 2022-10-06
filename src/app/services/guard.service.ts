import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class GuardService {

  constructor(private router: Router) { }

  validateCourseSelection(): boolean {
    const cs = localStorage.getItem('cs');
    if (cs) {
      return true;
    } else {
      this.router.navigate(['/home'])
      localStorage.clear()
      return false;
    }
  }

  validateEnrollment(): boolean {
    const en = localStorage.getItem('en');
    if (en) {
      return true;
    } else {
      this.router.navigate(['/home'])
      localStorage.clear()
      return false;
    }
  }

  validatelogteacher(): boolean {
    const lt = localStorage.getItem('lgc');
    if (lt) {
      return true;
    } else {
      this.router.navigate(['/home'])
      localStorage.clear()
      return false;
    }
  }
}
