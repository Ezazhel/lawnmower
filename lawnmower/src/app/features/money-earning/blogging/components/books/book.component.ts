import { Component, Input } from "@angular/core";
import Book from "@core/models/book";

@Component({
    selector:"book",
    template: "{{ book.name }} !"
})
export class BookComponent {

    @Input()
    book: Book;
    
    constructor(){};
}