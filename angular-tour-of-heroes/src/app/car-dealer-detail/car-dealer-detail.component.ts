
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CarDealer } from '../car-dealer';
import { CarDealerService } from '../car-dealer.service';

@Component({
  selector: 'app-car-dealer-detail',
  templateUrl: './car-dealer-detail.component.html',
  styleUrls: ['./car-dealer-detail.component.css']
})
export class CarDealerDetailComponent implements OnInit {
  carDealer: CarDealer;

  constructor(
    private route: ActivatedRoute,
    private carDealerService: CarDealerService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getCarDealer();
  }

  getCarDealer(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.carDealerService.getCarDealer(id)
      .subscribe(carDealer => this.carDealer = carDealer);
  }

  goBack(): void {
    this.location.back();
  }
  
  save(): void {
    this.carDealerService.updateCarDealer(this.carDealer)
      .subscribe(() => this.goBack());
  }
}