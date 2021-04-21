import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootStoreState } from 'app/root-store';
import { IdlingService } from './idling.service';

@Injectable({
    providedIn: 'root',
})
export class BookService {
    constructor(private _store: Store<RootStoreState.State>, private idlingService: IdlingService) {}

    private readBookSubscription = this.idlingService.timer$.subscribe((timer) => {});
}
