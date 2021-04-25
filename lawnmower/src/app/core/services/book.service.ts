import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { readBook } from '@root-store/blogging/blogging-action';
import { selectReadingBooks } from '@root-store/blogging/blogging-selector';
import { RootStoreState } from 'app/root-store';
import { filter, withLatestFrom } from 'rxjs/operators';
import { IdlingService } from './idling.service';

@Injectable({
    providedIn: 'root',
})
export class BookService {
    constructor(private _store: Store<RootStoreState.State>, private idlingService: IdlingService) {}

    private readBookSubscription = this.idlingService.timer$
        .pipe(
            withLatestFrom(this._store.select(selectReadingBooks)),
            filter(([_, books]) => books.length > 0),
        )
        .subscribe(([timer, books]) => {
            books.forEach((book) => {
                book.timeRead += timer.deltaTime;
                if (book.timeRead > book.timeToReadChapter(book.chapterRead)) {
                    book.chapterRead += 1;
                    book.timeRead = 0;
                }
                if (book.chapterRead === book.totalChapter) book.reading = false;
                this._store.dispatch(readBook({ book }));
            });
        });
}
