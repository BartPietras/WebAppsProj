import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDealerSearchComponent } from './car-dealer-search.component';

describe('CarDealerSearchComponent', () => {
  let component: CarDealerSearchComponent;
  let fixture: ComponentFixture<CarDealerSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarDealerSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarDealerSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
