import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import Book from '@core/models/book';

@Component({
    selector: 'book',
    template: `
        <div class="bookWrapper">
            <span>{{ book.name }} !</span>
            <span class="bookDescription">{{ book.effectDescription }}</span>
            <div fxLayout="column" class="bookState" *ngIf="book.unlocked">
                <span> Read {{ book.chapterRead }} / {{ book.totalChapter }} </span>
                <span *ngIf="book.chapterRead != book.totalChapter">
                    Progression : {{ book.timeRead | exponential }} / {{ book.timeToReadChapter(book.chapterRead) }}
                </span>
            </div>
        </div>
    `,
    styleUrls: ['./book.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookComponent {
    @Input()
    book: Book;

    constructor() {}
}
