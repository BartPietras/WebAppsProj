import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsDealerComponent } from './cars-dealer.component';

describe('CarsDealerComponent', () => {
  let component: CarsDealerComponent;
  let fixture: ComponentFixture<CarsDealerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarsDealerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsDealerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
