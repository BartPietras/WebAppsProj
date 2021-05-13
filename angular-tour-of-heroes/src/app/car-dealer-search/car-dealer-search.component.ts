import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { CarDealer } from '../car-dealer';
import { CarDealerService } from '../car-dealer.service';

@Component({
  selector: 'app-car-dealer-search',
  templateUrl: './car-dealer-search.component.html',
  styleUrls: ['./car-dealer-search.component.css']
})
export class CarDealerSearchComponent implements OnInit {
  carsDealer$: Observable<CarDealer[]>;
  private searchTerms = new Subject<string>();

  constructor(private carDealerService: CarDealerService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.carsDealer$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.carDealerService.searchCarsDealer(term)),
    );
  }
}