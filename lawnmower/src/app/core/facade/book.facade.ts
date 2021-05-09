import { Injectable } from '@angular/core';
import { Books } from '@core/data/book-data';
import Book from '@core/models/book';
import { Money } from '@core/models/Currencies';
import { Store } from '@ngrx/store';
import { readBook, unlockBook } from '@root-store/blogging/blogging-action';
import { selectBooks, selectCanBuyBook } from '@root-store/blogging/blogging-selector';
import { earnCurrency } from '@root-store/earning/earning-action';
import { RootStoreState } from 'app/root-store/';

@Injectable({ providedIn: 'root' })
export class BookFacadeService {
    books$ = this.store.select(selectBooks);

    canBuyBook$ = this.store.select(selectCanBuyBook);

    constructor(private store: Store<RootStoreState.State>) {}

    buyBook(books: Book[], money: Money) {
        const price = this.bookPrice(books);

        if (money.amount < price) return;

        const bookToUnlock = Object.values(Books).filter((b) => b.isBuyable && !books.find((book) => book.id == b.id));
        const bookUnlockedIndex = Math.floor(Math.random() * (bookToUnlock.length - 1));

        if (bookUnlockedIndex == -1) return;

        //select random, add "weight" to book.
        this.store.dispatch(unlockBook({ book: bookToUnlock[bookUnlockedIndex] }));
        this.store.dispatch(earnCurrency({ currency: { ...money, amount: -price } }));
    }

    readBook(book: Book) {
        if (book.unlocked && book.chapterRead != book.totalChapter)
            this.store.dispatch(readBook({ book: { ...book, reading: !book.reading } }));
    }

    bookPrice(books: Book[]) {
        return books.length * 10;
    }
}
