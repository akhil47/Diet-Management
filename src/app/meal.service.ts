import { Meal } from './meal.modal';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { TodayPlanService } from './today-plan.service';

@Injectable()
export class MealService{
    private meals: Meal[] = [];
    public mealsUpdates = new Subject<Meal[]>()

    constructor(private planService: TodayPlanService){

    }

    private publish(){
        this.mealsUpdates.next(this.meals.slice())
    }

    getMeals(){
        return this.meals.slice();
    }
    addMealToPlan(meal){
        this.planService.addMeal(meal)
    }
    addNewMeal(meal: Meal){
        this.meals.push(meal);
        console.log(this.meals)
        this.publish();
    }
    setMeals(meals){
        this.meals = meals
        this.publish()
    }
    updateMeal(id: number, newMeal: Meal){
        this.meals[id] = newMeal;
        this.publish();
    }
    deleteMeal(id: number){
        this.meals.splice(id, 1);
        this.publish();
    }

    calculateTotalCalories(protein, carbs, fat){
        return (protein * 4) + (carbs * 4) + (fat * 9)
    }

    calculateProtein(ingredients){
        let amount = 0;
        ingredients.forEach(element => {
            amount += +element.protein
        });
        return amount
    }
    calculateCarbs(ingredients){
        let amount = 0;
        ingredients.forEach(element => {
            amount += +element.carbs
        });
        return amount
    }
    calculateFat(ingredients){
        let amount = 0;
        ingredients.forEach(element => {
            amount += +element.fat
        });
        return amount
    }
    calculateSaturatedFat(ingredients){
        let amount = 0;
        ingredients.forEach(element => {
            amount += +element.saturatedFat
        });
        return amount
    }
    calculateDietaryFibre(ingredients){
        let amount = 0;
        ingredients.forEach(element => {
            amount += +element.dietaryFibre
        });
        return amount
    }
    calculateSugar(ingredients){
        let amount = 0;
        ingredients.forEach(element => {
            amount += +element.sugar
        });
        return amount
    }
    calculateSodium(ingredients){
        let amount = 0;
        ingredients.forEach(element => {
            amount += +element.sodium
        });
        return amount
    }
}