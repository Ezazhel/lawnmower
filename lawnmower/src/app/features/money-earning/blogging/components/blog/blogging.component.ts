import { BookService } from '@core/services/book.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Blogging } from '@core/models/blogging';

import { Store } from '@ngrx/store';
import { RootStoreState } from 'app/root-store';
import { selectBlogging, selectBooks } from 'app/root-store/blogging/blogging-selector';
import { Observable } from 'rxjs';
import { IdlingService } from '@core/services/idling.service';
import { Upgrade, UpgradeTabsAffected } from '@core/models/Upgrade';

@Component({
    selector: 'blogging',
    templateUrl: './blogging.component.html',
    styleUrls: ['./blogging.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BloggingComponent implements OnInit {
    upgradeTab: UpgradeTabsAffected = 'blogging';
    blogging$: Observable<Blogging> = this.store.select(selectBlogging);
    books$ = this.store.select(selectBooks);
    constructor(private store: Store<RootStoreState.State>, private bookService: BookService) {}

    ngOnInit(): void {}
}
