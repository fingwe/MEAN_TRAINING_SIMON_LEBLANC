import { Injectable } from '@angular/core';
import { PastSprint } from '../models/PastSprint';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  private sprintApiUrl = "http://localhost:3000/api/pastsprints";

  getSprints(): Observable<PastSprint[]>{
    return this.http.get<PastSprint[]>(this.sprintApiUrl)
      .pipe(
        tap(sprints => this.log(`fetched sprints`)),
        catchError(this.handleError('getSprints', []))
      );
  }

  addSprint(newSprint: PastSprint): Observable<PastSprint> {
    return this.http.post<PastSprint>(this.sprintApiUrl, newSprint, httpOptions).pipe(
      tap((sprint: PastSprint) => this.log(`added sprint w/ id= ${sprint.name}`)),
      catchError(this.handleError<PastSprint>('addSprint'))
    );
  }

  deleteSprints() {
    return this.http.delete<any>(this.sprintApiUrl, httpOptions).pipe(
      catchError(this.handleError())
    );
  }

  searchSprints(sterm: String): Observable<PastSprint[]> {
    return this.http.get<PastSprint[]>(`${this.sprintApiUrl}/search/${sterm}`)
    .pipe(
      tap(sprints => this.log(`searched sprints`)),
      catchError(this.handleError('getSprints', []))
    );
  }

  /**
   * Angular tutorial handle error method
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
 
    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead
 
    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);
 
    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

  private log(message: string) {
    console.log('Sprint Service:' + message);
  }

  constructor(private http: HttpClient) { }
}
