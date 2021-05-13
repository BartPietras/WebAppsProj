import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDealerDetailComponent } from './car-dealer-detail.component';

describe('CarDealerDetailComponent', () => {
  let component: CarDealerDetailComponent;
  let fixture: ComponentFixture<CarDealerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarDealerDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarDealerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
