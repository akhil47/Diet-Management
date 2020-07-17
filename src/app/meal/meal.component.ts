import { Component, OnInit, Input } from '@angular/core';
import { Meal } from '../meal.modal';
import { TodayPlanService } from '../today-plan.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent implements OnInit {

  @Input() meal: Meal
  @Input() index: number

  constructor(private planService: TodayPlanService, private router: Router) { }

  ngOnInit() {
  }

  onAddToPlan(){
    this.planService.addMeal(this.meal)
    this.router.navigate(['/todays-plan'])
  }
}
