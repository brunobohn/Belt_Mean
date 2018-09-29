import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../restaurant.service';
import { Router }            from '@angular/router';

@Component({
  selector: 'app-restaurant-new',
  templateUrl: './restaurant-new.component.html',
  styleUrls: ['./restaurant-new.component.css']
})
export class RestaurantNewComponent implements OnInit {
  restaurant;
  error: String;

  constructor(
    private _restaurantService: RestaurantService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.error = '';
    this.restaurant = {
      name: '',
      cuisine: ''
    }
  }

  addRestaurant(event) {
    event.preventDefault();
    let observable = this._restaurantService.addRestaurant(this.restaurant);
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
