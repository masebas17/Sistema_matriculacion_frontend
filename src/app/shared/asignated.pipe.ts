import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'asignated'
})
export class AsignatedPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if(value === null){
      return 'No Asignado';
    }
  }

}
