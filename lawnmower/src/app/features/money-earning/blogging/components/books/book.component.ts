import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import Book from '@core/models/book';

@Component({
    selector: 'book',
    template: `
        <div class="bookWrapper" [attr.data-unlocked]="book.unlocked">
            <span>{{ book.name }} !</span>
            <span class="bookDescription">{{ book.effectDescription }}</span>
            <div fxLayout="column" class="bookState" *ngIf="book.unlocked">
                <span> Read {{ book.chapterRead }} / {{ book.totalChapter }} </span>
                <span>Progression : {{ book.timeRead }} / {{ book.timeToReadChapter(book.chapterRead) }} </span>
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
