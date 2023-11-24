import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], term: string): any[] {
    if (!items || !term) {
      return items;
    }

    // return items.filter(item =>
    //   Object.values(item).some(value => (value !== null && value.toString().toLowerCase().includes(term.toLowerCase())))
    // );
    return items.filter(item =>
      (item.lastName && item.lastName.toLowerCase().includes(term.toLowerCase())) ||
      (item.name && item.name.toLowerCase().includes(term.toLowerCase()))
    );
  }
}
