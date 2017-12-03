import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BooksComponent} from "./books/books.component";
import {GitComponent} from "./git/git.component";

import {HttpClientModule} from "@angular/common/http";
import {GitService} from "./git/git.service";

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    GitComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [GitService],
  bootstrap: [AppComponent]
})
export class AppModule { }
