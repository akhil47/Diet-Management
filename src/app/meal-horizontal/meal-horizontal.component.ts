import { Component, OnInit, Input } from '@angular/core';
import { Meal } from '../meal.modal';
import { TodayPlanService } from '../today-plan.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meal-horizontal',
  templateUrl: './meal-horizontal.component.html',
  styleUrls: ['./meal-horizontal.component.css']
})
export class MealHorizontalComponent implements OnInit {

  @Input() meal: Meal
  @Input() id: number
  constructor(private planService: TodayPlanService) { }

  ngOnInit() {
  }

  onRemove(){
    this.planService.removeMeal(this.id)
  }
}