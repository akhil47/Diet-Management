import { Component, OnInit } from '@angular/core';
import { Meal } from '../meal.modal';
import { MealService } from '../meal.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-view-meal',
  templateUrl: './view-meal.component.html',
  styleUrls: ['./view-meal.component.css']
})
export class ViewMealComponent implements OnInit {

  meal: Meal
  id: number

  constructor(private mealService: MealService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) =>{
        this.id = +params['id']
        this.meal = this.mealService.getMeals()[this.id]
      }
    )
  }

  onAddToTodayPlan(){
    this.mealService.addMealToPlan(this.meal)
    this.router.navigate(['/todays-plan'])
  }
  onEditMeal(){
    this.router.navigate(['/meals', this.id, 'edit'])
  }
  onDeleteMeal(){
    this.mealService.deleteMeal(this.id)
    this.router.navigate(['/meals'])
  }

}
