import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'aproved'
})
export class AprovedPipe implements PipeTransform {

  transform(value: any, args?: any[]): any{
    
    if(value == true){
      return 'APROBADO';
    }
    if(value == false){
      return 'REPROBADO';
    }
  }
}
