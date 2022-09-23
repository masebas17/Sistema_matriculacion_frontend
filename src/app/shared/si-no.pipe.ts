import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'siNo'
})
export class SiNoPipe implements PipeTransform {

  transform(value: any, args?: any[]): any{
    
      if(value == 'true'){
        return 'SI';
      }
      if(value == 'false'){
        return 'NO';
      }
  }
}
