import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../restaurant.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-review-new',
  templateUrl: './review-new.component.html',
  styleUrls: ['./review-new.component.css']
})
export class ReviewNewComponent implements OnInit {
  review;
  error;
  restaurant;

  constructor(
    private _restaurantService: RestaurantService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.error = '';
    this.review = {
      name: '',
      content: '',
      star: 1
    };
    this.restaurant = {
      id: '',
      name: ''
    };
    this.getRestaurantId();
  }

  getRestaurantName() {
    let observable = this._restaurantService.getRestaurant(this.restaurant.id);
    observable.subscribe( (res) => {
      this.restaurant.name = res.json().data.name;
    });
  }

  getRestaurantId() {
    this._route.params.subscribe( (params) => {
      this.restaurant.id = params['id'];
      this.getRestaurantName();
    });
  }

  addReview(event) {
    let observable = this._restaurantService.addReview(this.restaurant.id, this.review);
    observable.subscribe(
      (res) => {
        this._router.navigate(['/review', this.restaurant.id]);
      },
      (err) => {
        this.error = err.json().message;
      }
    );
  }
}
