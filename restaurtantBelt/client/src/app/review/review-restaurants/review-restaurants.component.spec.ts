import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewRestaurantsComponent } from './review-restaurants.component';

describe('ReviewrestaurantsComponent', () => {
  let component: ReviewRestaurantsComponent;
  let fixture: ComponentFixture<ReviewRestaurantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewRestaurantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewRestaurantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
