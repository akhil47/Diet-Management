import { Component, OnInit, OnDestroy } from '@angular/core';
import { MealService } from '../meal.service';
import { Meal } from '../meal.modal';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css']
})
export class MealsComponent implements OnInit, OnDestroy{

  meals: Meal[];
  subscription: Subscription
  constructor(private mealService: MealService) { }

  ngOnInit() {
    this.meals = this.mealService.getMeals()
    this.subscription =  this.mealService.mealsUpdates.subscribe(
      (meals: Meal[]) => {
        this.meals = meals
      }
    )
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

}
