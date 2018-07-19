import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortSprint'
})
export class SortSprintPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
