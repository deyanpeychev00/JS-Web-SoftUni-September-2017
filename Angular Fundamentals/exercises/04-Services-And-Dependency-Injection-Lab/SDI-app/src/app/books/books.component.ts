import {Component, OnInit} from "@angular/core";
import {BookService} from "./book.service";
import {Book} from "./book";

@Component({
  selector: 'books',
  templateUrl: './books.component.html',
  providers: [BookService]
})

export class BooksComponent implements OnInit{
  books: Book[];

  constructor(
    private booksService: BookService
  ){

  }
  ngOnInit(): void{
      this.books = this.booksService.getAllBooks();
  }
}
