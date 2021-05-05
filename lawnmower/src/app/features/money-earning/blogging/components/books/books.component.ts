import { Books } from '@core/data/book-data';
import { Component, OnInit } from '@angular/core';
import Book from '@core/models/book';
import { select, Store } from '@ngrx/store';
import { readBook, unlockBook } from '@root-store/blogging/blogging-action';
import { selectBooks, selectCanBuyBook } from '@root-store/blogging/blogging-selector';
import { RootStoreState } from 'app/root-store/';
import { switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { selectMoney } from '@root-store/earning/earning-selector';
import { S_IFBLK } from 'constants';
import { earnCurrency } from '@root-store/earning/earning-action';

@Component({
    selector: 'books',
    templateUrl: './books.component.html',
    styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
    books$ = this.store.pipe(
        select(selectBooks),
        tap((books) => (this.bookPrice = books.length * 10)),
    );
    canBuyBook$ = this.store.select(selectCanBuyBook);
    bookPrice: number;

    doBuyBook$ = new Subject();

    buyBook$ = this.doBuyBook$
        .pipe(withLatestFrom(this.books$, this.store.select(selectMoney)))
        .subscribe(([, books, money]) => {
            if (money.amount < this.bookPrice) return;

            const bookToUnlock = Object.values(Books).filter(
                (b) => b.isBuyable && !books.find((book) => book.id == b.id),
            );
            const bookUnlockedIndex = Math.floor(Math.random() * (bookToUnlock.length - 1));
            //select random, add "weight" to book.
            this.store.dispatch(unlockBook({ book: bookToUnlock[bookUnlockedIndex] }));
            this.store.dispatch(earnCurrency({ currency: { ...money, amount: -this.bookPrice } }));
        });
    constructor(private store: Store<RootStoreState.State>) {}

    ngOnInit(): void {}

    trackByFunction(index: number, book: Book) {
        return book.id;
    }

    read(book: Book) {
        if (book.unlocked && book.chapterRead != book.totalChapter)
            this.store.dispatch(readBook({ book: { ...book, reading: !book.reading } }));
    }
}
