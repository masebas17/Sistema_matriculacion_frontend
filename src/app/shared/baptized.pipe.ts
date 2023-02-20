import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'baptized'
})
export class BaptizedPipe implements PipeTransform {

  transform(value: any, args?: any[]): any{
    
    if(value == true){
      return 'SI';
    }
    if(value == false){
      return 'NO';
    }
}
}
