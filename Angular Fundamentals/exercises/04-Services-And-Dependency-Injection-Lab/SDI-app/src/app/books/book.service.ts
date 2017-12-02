import {Book} from "./book";
import {Injectable} from "@angular/core";

@Injectable()
export class BookService {
  getAllBooks(): Book[] {
    return [
      new Book('It', 'Stepheh King', 23.2, new Date(1986, 9, 15)),
      new Book('Harry Potter and the philosophers stone', 'J.K.Rowling', 22.1, new Date(1997, 6, 26)),
      new Book('C# Programming Fundamentals', 'Svetlin Nakov', 50, new Date(2016, 6, 6)),
    ];
  }
}
