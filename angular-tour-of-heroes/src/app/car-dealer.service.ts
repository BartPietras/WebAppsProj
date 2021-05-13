import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { CarDealer } from './car-dealer';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class CarDealerService {

  private carsDealerUrl = 'api/carsDealer';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET heroes from the server */
  getCarsDealer(): Observable<CarDealer[]> {
    return this.http.get<CarDealer[]>(this.carsDealerUrl)
      .pipe(
        tap(_ => this.log('fetched car dealers')),
        catchError(this.handleError<CarDealer[]>('getCarsDealer', []))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getCarDealerNo404<Data>(id: number): Observable<CarDealer> {
    const url = `${this.carsDealerUrl}/?id=${id}`;
    return this.http.get<CarDealer[]>(url)
      .pipe(
        map(carsDealer => carsDealer[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} carDealer id=${id}`);
        }),
        catchError(this.handleError<CarDealer>(`getCarDealer id=${id}`))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getCarDealer(id: number): Observable<CarDealer> {
    const url = `${this.carsDealerUrl}/${id}`;
    return this.http.get<CarDealer>(url).pipe(
      tap(_ => this.log(`fetched car dealer id=${id}`)),
      catchError(this.handleError<CarDealer>(`getCarDealer id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchCarsDealer(term: string): Observable<CarDealer[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<CarDealer[]>(`${this.carsDealerUrl}/?brand=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found cars dealer matching "${term}"`) :
         this.log(`no cars dealer matching "${term}"`)),
      catchError(this.handleError<CarDealer[]>('searchCarsDealer', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addCarDealer(carDealer: CarDealer): Observable<CarDealer> {
    return this.http.post<CarDealer>(this.carsDealerUrl, carDealer, this.httpOptions).pipe(
      tap((newCarDealer: CarDealer) => this.log(`added car dealer w/ id=${newCarDealer.id}`)),
      catchError(this.handleError<CarDealer>('addCarDealer'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteCarDealer(id: number): Observable<CarDealer> {
    const url = `${this.carsDealerUrl}/${id}`;

    return this.http.delete<CarDealer>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted car dealer id=${id}`)),
      catchError(this.handleError<CarDealer>('deleteCarDealer'))
    );
  }

  /** PUT: update the hero on the server */
  updateCarDealer(carDealer: CarDealer): Observable<any> {
    return this.http.put(this.carsDealerUrl, carDealer, this.httpOptions).pipe(
      tap(_ => this.log(`updated car dealer id=${carDealer.id}`)),
      catchError(this.handleError<any>('updateCarDealer'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`CarDealerService: ${message}`);
  }
}