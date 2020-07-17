import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router} from '@angular/router'

import { Meal } from '../meal.modal'
import { MealService } from '../meal.service';
import { Ingredient } from '../ingredient.modal';

@Component({
  selector: 'app-new-meal',
  templateUrl: './new-meal.component.html',
  styleUrls: ['./new-meal.component.css']
})
export class NewMealComponent implements OnInit {

  id: number
  editMode: boolean = false
  ingredients = new FormArray([])
  mealForm: FormGroup

  constructor(private mealService: MealService, private route: ActivatedRoute, private router: Router){

  }

  ngOnInit(){
    this.route.params.subscribe(
      (params: Params) =>{
        this.id = +params['id']
        this.editMode = params['id'] != null
      }
    )
    this.initForm();
  }
  initForm(){
    let name: string = '';
    let imagePath: string = '';

    if(this.editMode){
      let meal = this.mealService.getMeals()[this.id]
      name = meal.name
      imagePath = meal.imagePath
      for(let ingredient of meal.ingredients){
        this.ingredients.push( new FormGroup({
          'name': new FormControl(ingredient.name, Validators.required),
          'quantity': new FormControl(ingredient.quantity, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
          'calories': new FormControl(ingredient.calories, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
          'protein': new FormControl(ingredient.protein, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
          'carbs': new FormControl(ingredient.carbs, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
          'fat': new FormControl(ingredient.fat, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
          'saturatedFat': new FormControl(ingredient.saturatedFat, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
          'dietaryFibre': new FormControl(ingredient.dietaryFibre, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
          'sugar': new FormControl(ingredient.sugar, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
          'sodium': new FormControl(ingredient.sodium, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
        }))
      }
    }

    this.mealForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'ingredients': this.ingredients
    })
  }

  onAddIngredient(){
    (<FormArray>this.mealForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'quantity': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
        'calories': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
        'protein': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
        'carbs': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
        'fat': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
        'saturatedFat': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
        'dietaryFibre': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
        'sugar': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
        'sodium': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      })
    )
  }
  onDeleteIngredient(id: number){
    (<FormArray>this.mealForm.get('ingredients')).removeAt(id)
  }
  getControls() {
    return (<FormArray>this.mealForm.get('ingredients')).controls;
  }

  onSubmit(){
    console.log(this.mealForm)
    let newMeal = new Meal()
    newMeal.name = this.mealForm.value['name']
    newMeal.imagePath = this.mealForm.value['imagePath']
    
    newMeal.protein = this.mealService.calculateProtein(this.mealForm.value['ingredients'])
    newMeal.carbs = this.mealService.calculateCarbs(this.mealForm.value['ingredients'])
    newMeal.fat = this.mealService.calculateFat(this.mealForm.value['ingredients'])
    newMeal.saturatedFat = this.mealService.calculateSaturatedFat(this.mealForm.value['ingredients'])
    newMeal.dietaryFibre = this.mealService.calculateDietaryFibre(this.mealForm.value['ingredients'])
    newMeal.sugar = this.mealService.calculateSugar(this.mealForm.value['ingredients'])
    newMeal.sodium = this.mealService.calculateSodium(this.mealForm.value['ingredients'])
    newMeal.ingredients = this.mealForm.value['ingredients']
    newMeal.calories = this.mealService.calculateTotalCalories(newMeal.protein, newMeal.carbs, newMeal.fat)

    if(this.editMode){
      this.mealService.updateMeal(this.id, newMeal)
      this.router.navigate(['/view-meal', this.id])
    }
    else{
      this.mealService.addNewMeal(newMeal)
      this.router.navigate(['/view-meal', this.mealService.getMeals().length - 1])
    }
  }
  
  onCancel(){
    this.editMode = false
    if(this.id >= 0) this.router.navigate(['/view-meal', this.id])
    else this.router.navigate(['/meals'])
  }
}
