import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {GamesComponent} from './games/game.component';
import {AboutComponent} from './about/about.component';


@NgModule({
  declarations: [
    AppComponent,
    GamesComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
