import { Meal } from './meal.modal';
import { Subject } from 'rxjs';

export class TodayPlanService{
    private mealPlan: Meal[] = []
    public planUpdates = new Subject<Meal[]>()

    private publish(){
        this.planUpdates.next(this.mealPlan.slice())
    }
    getMealPlan(){
        return this.mealPlan.slice()
    }
    addMeal(meal){
        this.mealPlan.push(meal)
        this.publish()
    }
    removeMeal(id: number){
        this.mealPlan.splice(id, 1)
        this.publish()
    }
    calculateTotalCalories(protein, carbs, fat){
        return (protein * 4) + (carbs * 4) + (fat * 9)
    }

    calculateProtein(meals){
        let amount = 0;
        meals.forEach(element => {
            amount += <number>element.protein
        });
        return amount
    }
    calculateCarbs(meals){
        let amount = 0;
        meals.forEach(element => {
            amount += <number>element.carbs
        });
        return amount
    }
    calculateFat(meals){
        let amount = 0;
        meals.forEach(element => {
            amount += <number>element.fat
        });
        return amount
    }
    calculateSaturatedFat(meals){
        let amount = 0;
        meals.forEach(element => {
            amount += <number>element.saturatedFat
        });
        return amount
    }
    calculateDietaryFibre(meals){
        let amount = 0;
        meals.forEach(element => {
            amount += <number>element.dietaryFibre
        });
        return amount
    }
    calculateSugar(meals){
        let amount = 0;
        meals.forEach(element => {
            amount += <number>element.sugar
        });
        return amount
    }
    calculateSodium(meals){
        let amount = 0;
        meals.forEach(element => {
            amount += <number>element.sodium
        });
        return amount
    }

}