import { Injectable } from '@angular/core';
import { PastSprint } from '../models/PastSprint';
import { SPRINTS } from './data/mock-sprints';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  getSprints(): Observable<PastSprint[]>{
    return of(SPRINTS);
  }

  constructor() { }
}
