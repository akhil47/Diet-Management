import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MealService } from './meal.service';
import { Meal } from './meal.modal';
import { map } from 'rxjs/operators';


@Injectable()
export class DataStorageService{
    constructor(private http: HttpClient, private mealService: MealService){
    }

    storeMeals(){
        this.http.put('https://diet-management-68fc6.firebaseio.com/meals.json', this.mealService.getMeals()).subscribe(
            (response: Response) => {
                console.log(response)
            }
        )
    }
    getMeals(){
        this.http.get<Meal[]>('https://diet-management-68fc6.firebaseio.com/meals.json').pipe(map(
            (meals) =>{
                for(let meal of meals){
                    if(!meal['ingredients']){
                        meal['ingredients'] = []
                    }
                }
                return meals
            }
        )).subscribe(
            (meals: Meal[]) => {
              this.mealService.setMeals(meals);
            }
          )
        console.log(this.mealService.getMeals())
    }

}