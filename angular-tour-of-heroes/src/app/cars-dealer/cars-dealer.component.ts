import { Component, OnInit } from '@angular/core';

import { CarDealer } from '../car-dealer';
import { CarDealerService } from '../car-dealer.service';

@Component({
  selector: 'app-cars-dealer',
  templateUrl: './cars-dealer.component.html',
  styleUrls: ['./cars-dealer.component.css']
})
export class CarsDealerComponent implements OnInit {
  carsDealer: CarDealer[];

  constructor(private carDealerService: CarDealerService) { }

  ngOnInit() {
    this.getCarsDealer();
  }

  getCarsDealer(): void {
    this.carDealerService.getCarsDealer()
        .subscribe(carsDealer => this.carsDealer = carsDealer);
  }

  add(brand: string): void {
    brand = brand.trim();
    if (!brand) { return; }
    this.carDealerService.addCarDealer({ brand } as CarDealer)
      .subscribe(carDealer => {
        this.carsDealer.push(carDealer);
      });
  }

  delete(carDealer: CarDealer): void {
    this.carsDealer = this.carsDealer.filter(c => c !== carDealer);
    this.carDealerService.deleteCarDealer(carDealer.id).subscribe();
  }

}