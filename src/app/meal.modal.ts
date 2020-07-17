import { Ingredient } from './ingredient.modal';

export class Meal{
    // constructor(name, imagePath, protein, carbs, fat, calories, saturatedFat, dietaryFibre, sugar, sodium, ingredients: Ingredient[]){
    //     name = this.name
    //     imagePath = this.imagePath
    //     protein = this.protein
    //     carbs = this.carbs
    //     fat = this.fat
    //     calories = this.calories
    //     saturatedFat = this.saturatedFat
    //     dietaryFibre = this.dietaryFibre
    //     sugar = this.sugar
    //     sodium = this.sodium
    //     ingredients = this.ingredients
    // }
    name: string;
    imagePath: string;
    protein: number;
    carbs: number;
    fat: number;
    calories: number;
    saturatedFat: number;
    dietaryFibre: number;
    sugar: number;
    sodium: number;
    ingredients: Ingredient[];
    
}
