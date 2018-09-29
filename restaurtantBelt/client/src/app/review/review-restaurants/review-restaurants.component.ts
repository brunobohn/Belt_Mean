import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../restaurant.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-review-restaurants',
  templateUrl: './review-restaurants.component.html',
  styleUrls: ['./review-restaurants.component.css']
})
export class ReviewRestaurantsComponent implements OnInit {
  reviews;
  restaurant;

  constructor(
    private _restaurantService: RestaurantService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.reviews = [];
    this.restaurant = {
      id: '',
      name: '',
      cuisine: ''
    };
    this.getReviews();
  }

  getReviews() {
    this._route.params.subscribe( (params) => {
      this.restaurant.id = params['id'];
      let observable = this._restaurantService.getReviews(this.restaurant.id);
      observable.subscribe( (res) => {
        this.reviews = res.json().data.reviews;
        this.restaurant.name = res.json().data.name;
        this.restaurant.cuisine = res.json().data.cuisine;
      });
    });
  }

  deleteReview(id) {
    let observable = this._restaurantService.deleteReview(id);
    observable.subscribe( (res) => {
      this.getReviews();
    });
  }

}
