import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { PastSprint } from '../models/PastSprint';

@Pipe({
  name: 'filterSprint'
})
@Injectable()
export class FilterSprintPipe implements PipeTransform {

  transform(sprints: PastSprint[], value: string): any[] {

    let byDescription: PastSprint[];
    let byName: PastSprint[];
    let byStatus: PastSprint[];
    let byDate: PastSprint[];
    let max: number;

    if (!sprints) {
      return [];
    }
    if (!value) {
      return sprints;
    }

    byName = sprints.filter(singleEntity => singleEntity['name'].toLowerCase().includes(value.toLowerCase()));
    byStatus = sprints.filter(singleEntity => singleEntity['status'].toLowerCase().includes(value.toLowerCase()));
    byDate = sprints.filter(singleEntity => singleEntity['createdAt'].toString().slice(0,10).includes(value));
    byDescription = sprints.filter(singleEntity => singleEntity['description'].toLowerCase().includes(value.toLowerCase()));

    max = 0;

    //find better result
    if ( byName.length > max ) { max = byName.length; }
    if ( byStatus.length > max ) { max = byStatus.length; }
    if ( byDate.length > max ) { max = byDate.length; }
    if ( byDescription.length > max ) { max = byDescription.length; }

    //return better result
    if ( byName.length === max ) { 
      return byName;
    }
    if (byStatus.length === max ) {
      return byStatus;
    }
    if ( byDate.length === max ) {
      return byDate;
    }
    if ( byDescription.length === max ) {
      return byDescription;
    }
  }

}
