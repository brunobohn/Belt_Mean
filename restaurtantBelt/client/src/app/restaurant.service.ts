import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class RestaurantService {

  constructor(private _http: Http) { }

  getRestaurants() {
    return this._http.get('/restaurants');
  }

  getReviews(id) {
    return this._http.get(`/restaurants/${id}`);
  }

  addRestaurant(restaurant) {
    return this._http.post('/restaurants', restaurant);
  }

  addReview(id, review) {
    return this._http.post(`/restaurants/${id}`, review);
  }

  getRestaurant(id) {
    return this._http.get(`/restaurants/${id}`);
  }

  editRestaurant(id, restaurant) {
    return this._http.put(`/restaurants/${id}`, restaurant);
  }

  deleteRestaurant(id) {
    return this._http.delete(`/restaurants/${id}`);
  }

  deleteReview(id) {
    return this._http.delete(`/restaurants/${id}`);
  }
}
