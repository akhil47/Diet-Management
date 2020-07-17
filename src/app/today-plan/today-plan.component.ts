import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodayPlanService } from '../today-plan.service';
import { Subscription } from 'rxjs';
import { Meal } from '../meal.modal';

@Component({
  selector: 'app-today-plan',
  templateUrl: './today-plan.component.html',
  styleUrls: ['./today-plan.component.css']
})
export class TodayPlanComponent implements OnInit, OnDestroy {

  subscription: Subscription
  meals: Meal[];

  calories: number;
  protein: number;
  carbs: number;
  fat: number;

  sugar: number;
  sodium: number;

  constructor(private planService: TodayPlanService) { }

  ngOnInit() {
    this.meals = this.planService.getMealPlan()
    this.initValues()
    this.subscription = this.planService.planUpdates.subscribe(
      (meals: Meal[]) =>{
        this.meals = meals
        this.initValues()
      }
    )
  }
  initValues(){
    this.protein = this.planService.calculateProtein(this.meals)
    this.carbs = this.planService.calculateCarbs(this.meals)
    this.fat = this.planService.calculateFat(this.meals)
    this.calories = this.planService.calculateTotalCalories(this.protein, this.carbs, this.fat)

    this.sugar = this.planService.calculateSugar(this.meals)
    this.sodium = this.planService.calculateSodium(this.meals)
  }
  ngOnDestroy(){
    this.subscription.unsubscribe()
  }
}
