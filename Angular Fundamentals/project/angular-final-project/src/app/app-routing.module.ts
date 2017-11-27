import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainMapComponent} from './main-map/main-map.component';
import {RegisterPageComponent} from "./register-page/register-page.component";
import {LoginPageComponent} from "./login-page/login-page.component";

let homeComponent;

if(localStorage.getItem('authtoken') !== null){
  homeComponent = '';
}else{
  homeComponent = 'asd';
}

const routes: Routes = [
  { path: '', redirectTo: '/map', pathMatch: 'full' },
  { path: 'map', component: MainMapComponent},
  { path: 'register', component: RegisterPageComponent},
  { path: 'login', component: LoginPageComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
