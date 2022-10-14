import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enrollment'
})
export class EnrollmentPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if(value === null){
      return 'Incompleta';
    }
    else{
      return 'Completa';
    }
  }

}
