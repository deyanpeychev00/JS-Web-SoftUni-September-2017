import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ComponentsObj} from "./export/components/export-components-obj";

const routes: Routes = [
  {path: '', redirectTo: '/map', pathMatch: 'full'},
  {path: 'map', component: ComponentsObj.MainMap},
  {path: 'register', component: ComponentsObj.RegisterPage},
  {path: 'login', component: ComponentsObj.LoginPage},
  {path: 'catalog', component: ComponentsObj.Catalog},
  {path: 'add-product', component: ComponentsObj.AddProduct},
  {path: 'items/details/:id', component: ComponentsObj.ItemDetails},
  {path: 'items/edit/:id', component: ComponentsObj.EditItem},
  {path: 'my-orders', component: ComponentsObj.MyOrders},
  {path: 'orders/manage', component: ComponentsObj.ManageOrders},
  {path: 'orders/edit/:id', component: ComponentsObj.ChangeOrderStatus},
  {path: '**', component: ComponentsObj.NotFound }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
