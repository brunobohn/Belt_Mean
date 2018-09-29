import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../restaurant.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-restaurant-restaurants',
  templateUrl: './restaurant-restaurants.component.html',
  styleUrls: ['./restaurant-restaurants.component.css']
})
export class RestaurantrestaurantsComponent implements OnInit {
  restaurants;
  display_delete;

  constructor(
    private _restaurantService: RestaurantService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getRestaurants();
    this.display_delete = true;
  }

  getRestaurants() {
    let observable = this._restaurantService.getRestaurants();

    observable.subscribe( (data) => {
      this.restaurants = data.json().data;
    })
  }

  deleteRestaurant(id) {
    let observable = this._restaurantService.deleteRestaurant(id);
    observable.subscribe( (data) => {
      this.getRestaurants();
    })
  }

}
