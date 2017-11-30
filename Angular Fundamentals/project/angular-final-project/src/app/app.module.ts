import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from "@angular/forms";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MainMapComponent } from './components/main-map/main-map.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { ItemComponent } from './components/item/item.component';
import { ToastrService } from './services/toastr-service/toastr.service';
import { AddProductComponent } from './components/add-product/add-product.component';
import { RouterAuthService } from './services/router-auth-service/router-auth.service';
import { AuthService } from './services/auth-service/auth.service';
import {CatalogService} from "./services/catalog-service/catalog.service";
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { LocationsService } from './services/locations-service/locations.service';
import { EditItemComponent } from './components/edit-item/edit-item.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [ToastrService, RouterAuthService, AuthService, CatalogService, LocationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
