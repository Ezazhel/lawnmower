import { Component, OnInit, Input } from '@angular/core';
import Book from '@core/models/book';
import { BookFacadeService } from '@core/facade/book.facade';
import { CurrencyFacadeService } from '@core/facade/currency.facade';
import { withLatestFrom } from 'rxjs/operators';
import { Money } from '@core/models/Currencies';

@Component({
    selector: 'books',
    templateUrl: './books.component.html',
    styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
    booksAndMoney$ = this.bookFacade.books$.pipe(withLatestFrom(this.currencyFacade.money$));

    canBuyBook$ = this.bookFacade.canBuyBook$;

    price = (books: Book[]) => this.bookFacade.bookPrice(books);

    constructor(private bookFacade: BookFacadeService, private currencyFacade: CurrencyFacadeService) {}

    ngOnInit(): void {}

    trackByFunction(index: number, book: Book) {
        return book.id;
    }

    buyBook({ [0]: books, [1]: money }: [Book[], Money]) {
        this.bookFacade.buyBook(books, money);
    }
    read(book: Book) {
        this.bookFacade.readBook(book);
    }
}
