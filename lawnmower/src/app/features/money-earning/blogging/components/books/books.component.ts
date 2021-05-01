import { Books } from '@core/data/book-data';
import { Component, OnInit } from '@angular/core';
import Book from '@core/models/book';
import { Store } from '@ngrx/store';
import { readBook } from '@root-store/blogging/blogging-action';
import { selectBooks, selectCanBuyBook } from '@root-store/blogging/blogging-selector';
import { RootStoreState } from 'app/root-store/';

@Component({
    selector: 'books',
    templateUrl: './books.component.html',
    styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
    books$ = this.store.select(selectBooks);
    canBuyBook$ = this.store.select(selectCanBuyBook);
    constructor(private store: Store<RootStoreState.State>) {}

    ngOnInit(): void {}

    trackByFunction(index: number, book: Book) {
        return book.id;
    }

    read(book: Book) {
        if (book.unlocked && book.chapterRead != book.totalChapter)
            this.store.dispatch(readBook({ book: { ...book, reading: !book.reading } }));
    }

    buyBook(books: Book[]) {
        const bookToUnlock = Object.values(Books).filter((b) => b.isBuyable && !books.find((book) => book.id == b.id));
        //select random, add "weight" to book.
        console.log(bookToUnlock);
    }
}
