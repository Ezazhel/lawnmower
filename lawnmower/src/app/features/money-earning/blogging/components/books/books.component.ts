import { Component, OnInit } from '@angular/core';
import Book from '@core/models/book';
import { Store } from '@ngrx/store';
import { selectBooks } from '@root-store/blogging/blogging-selector';
import { RootStoreState } from 'app/root-store/';

@Component({
    selector: 'books',
    templateUrl: './books.component.html',
    styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
    books$ = this.store.select(selectBooks);

    constructor(private store: Store<RootStoreState.State>) {}

    ngOnInit(): void {}


    trackByFunction(index: number, book: Book){
        return book.id;
    }
}
