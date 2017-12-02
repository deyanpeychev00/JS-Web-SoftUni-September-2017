// Modules
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from './app-routing.module';

// Services
import {ToastrService} from './services/toastr-service/toastr.service';
import {RouterAuthService} from './services/router-auth-service/router-auth.service';
import {AuthService} from './services/auth-service/auth.service';
import {CatalogService} from "./services/catalog-service/catalog.service";
import {LocationsService} from './services/locations-service/locations.service';
import {AdminService} from './services/admin/admin.service';

// Components
import {AppComponent} from './app.component';
import {MainMapComponent} from './components/main-map/main-map.component';
import {RegisterPageComponent} from './components/register-page/register-page.component';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {CatalogComponent} from './components/catalog/catalog.component';
import {ItemComponent} from './components/item/item.component';
import {AddProductComponent} from './components/add-product/add-product.component';
import {ItemDetailsComponent} from './components/item-details/item-details.component';
import {EditItemComponent} from './components/edit-item/edit-item.component';
import {MyOrdersComponent} from './components/my-orders/my-orders.component';
import {SingleOrderComponent} from './components/single-order/single-order.component';
import {ManageOrdersComponent} from './components/manage-orders/manage-orders.component';
import {ChangeOrderStatusComponent} from './components/change-order-status/change-order-status.component';

@NgModule({
  declarations: [
    AppComponent,
    MainMapComponent,
    RegisterPageComponent,
    LoginPageComponent,
    CatalogComponent,
    ItemComponent,
    AddProductComponent,
    ItemDetailsComponent,
    EditItemComponent,
    MyOrdersComponent,
    SingleOrderComponent,
    ManageOrdersComponent,
    ChangeOrderStatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    ToastrService,
    RouterAuthService,
    AuthService,
    CatalogService,
    LocationsService,
    AdminService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
