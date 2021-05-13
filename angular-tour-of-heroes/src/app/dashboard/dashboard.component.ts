import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Car } from '../car';
import { CarService } from '../car.service';
import { CarDealer } from '../car-dealer';
import { CarDealerService } from '../car-dealer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  cars: Car[] = [];
  carsDealer: CarDealer[] = [];

  constructor(private carsService:CarService) { }

  ngOnInit() {
    this.getCars();
  }

  getCars(): void {
    this.carsService.getCars()
      .subscribe(cars => this.cars = cars.slice(0, 5));
  }
  
  
}