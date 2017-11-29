import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from "@angular/forms";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { MainMapComponent } from './components/main-map/main-map.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { ItemComponent } from './components/item/item.component';
import { ToastrService } from './toastr.service';
import { AddProductComponent } from './components/add-product/add-product.component';
import { RouterAuthService } from './router-auth.service';




@NgModule({
  declarations: [
    AppComponent,
    MainMapComponent,
    RegisterPageComponent,
    LoginPageComponent,
    CatalogComponent,
    ItemComponent,
    AddProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [ToastrService, RouterAuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
