import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantrestaurantsComponent } from './restaurant/restaurant-restaurants/restaurant-restaurants.component';
import { RestaurantNewComponent } from './restaurant/restaurant-new/restaurant-new.component';
import { RestaurantEditComponent } from './restaurant/restaurant-edit/restaurant-edit.component';
import { ReviewRestaurantsComponent } from './review/review-restaurants/review-restaurants.component';
import { ReviewNewComponent } from './review/review-new/review-new.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/restaurants' },
  { path: 'restaurants',          component: RestaurantrestaurantsComponent },
  { path: 'new',            component: RestaurantNewComponent },
  { path: 'edit/:id',       component: RestaurantEditComponent },
  { path: 'review/:id',     component: ReviewRestaurantsComponent },
  { path: 'write/:id',      component: ReviewNewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
