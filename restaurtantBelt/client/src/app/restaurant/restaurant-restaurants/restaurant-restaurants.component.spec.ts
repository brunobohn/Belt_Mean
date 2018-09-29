import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantrestaurantsComponent } from './Restaurant-restaurants.component';

describe('RestaurantrestaurantsComponent', () => {
  let component: RestaurantrestaurantsComponent;
  let fixture: ComponentFixture<RestaurantrestaurantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantrestaurantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantrestaurantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
