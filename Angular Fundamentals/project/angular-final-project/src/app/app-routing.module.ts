import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainMapComponent} from './components/main-map/main-map.component';
import {RegisterPageComponent} from "./components/register-page/register-page.component";
import {LoginPageComponent} from "./components/login-page/login-page.component";
import {CatalogComponent} from "./components/catalog/catalog.component";
import {AddProductComponent} from "./components/add-product/add-product.component";
import {ItemDetailsComponent} from "./components/item-details/item-details.component";
import {EditItemComponent} from "./components/edit-item/edit-item.component";


let homeComponent;

if (localStorage.getItem('authtoken') !== null) {
  homeComponent = '';
} else {
  homeComponent = 'asd';
}

const routes: Routes = [
  {path: '', redirectTo: '/map', pathMatch: 'full'},
  {path: 'map', component: MainMapComponent},
  {path: 'register', component: RegisterPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'catalog', component: CatalogComponent},
  {path: 'add-product', component: AddProductComponent},
  {path: 'items/details/:id', component: ItemDetailsComponent},
  {path: 'items/edit/:id', component: EditItemComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
