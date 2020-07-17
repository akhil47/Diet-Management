import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'
import { MealService } from './meal.service';
import { DataStorageService } from './data-storage.service';
import { AuthService } from './auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'diet-management';

  constructor(private dataService: DataStorageService, private auth: AuthService){}
  ngOnInit(){
    this.dataService.getMeals()
  }
  isAuth(){
    return this.auth.isAutheticated()
  }

}
