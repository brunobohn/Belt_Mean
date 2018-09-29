import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../restaurant.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-edit',
  templateUrl: './restaurant-edit.component.html',
  styleUrls: ['./restaurant-edit.component.css']
})
export class RestaurantEditComponent implements OnInit {
  restaurant;
  error: String;

  constructor(
    private _restaurantService: RestaurantService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.error = '';
    this.restaurant = {
      id: '',
      name: '',
      cuisine: ''
    }
    this.getRestaurant();
  }

  getRestaurant() {
    this._route.params.subscribe( (params) => {
      let observable = this._restaurantService.getRestaurant(params['id']);
      observable.subscribe( (res) => {
        this.restaurant.name = res.json().data.name;
        this.restaurant.cuisine = res.json().data.cuisine;
        this.restaurant.id = res.json().data._id;
      })
    })
  }

  editRestaurant(event) {
    event.preventDefault();
    let observable = this._restaurantService.editRestaurant(this.restaurant.id, this.restaurant);
    observable.subscribe(
      (res) => {
        this._router.navigate(['/restaurants']);
      },
      (err) => {
        this.error = err.json().message;
      }
    )
  }
}
