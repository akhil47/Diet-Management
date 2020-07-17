import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MealsComponent } from './meals/meals.component';
import { TodayPlanComponent } from './today-plan/today-plan.component';
import { NewMealComponent } from './new-meal/new-meal.component';
import { ViewMealComponent } from './view-meal/view-meal.component';
import { MealComponent } from './meal/meal.component';
import { MealHorizontalComponent } from './meal-horizontal/meal-horizontal.component';
import { LoginComponent } from './login/login.component';
import { AppDropdownDirective } from './app-dropdown.directive';
import { MealService } from './meal.service';
import { TodayPlanService } from './today-plan.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { DataStorageService } from './data-storage.service';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire'
import { environment } from '../environments/environment'

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  {path: 'meals', component: MealsComponent, canActivate: [AuthGuard]},
  {path: 'meals/:id/edit', component: NewMealComponent, canActivate: [AuthGuard]},
  {path: 'todays-plan', component: TodayPlanComponent, canActivate: [AuthGuard]},
  {path: 'new-meal', component: NewMealComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  {path: 'view-meal/:id', component: ViewMealComponent, canActivate: [AuthGuard]},
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MealsComponent,
    TodayPlanComponent,
    NewMealComponent,
    ViewMealComponent,
    MealComponent,
    MealHorizontalComponent,
    LoginComponent,
    AppDropdownDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [MealService, TodayPlanService, AuthService, AuthGuard, DataStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
