import { UpgradeState } from 'app/root-store/upgrades';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Blogging } from '@core/models/blogging';
import { Observable } from 'rxjs';
import { BloggingFacadeService } from '@core/facade/blogging.facade';
import { BookFacadeService } from '@core/facade/book.facade';

@Component({
    selector: 'blogging',
    templateUrl: './blogging.component.html',
    styleUrls: ['./blogging.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BloggingComponent implements OnInit {
    upgradeTab: keyof UpgradeState.State = 'blogging';

    blogging$: Observable<Blogging> = this.blogFacade.blogging$;
    books$ = this.bookFacade.books$;
    constructor(private blogFacade: BloggingFacadeService, private bookFacade: BookFacadeService) {}

    ngOnInit(): void {}
}
