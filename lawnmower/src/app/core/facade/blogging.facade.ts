import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
    canAutomateIdea,
    selectAutomateIdea,
    selectBlogging,
    selectIsThinking,
} from 'app/root-store/blogging/blogging-selector';
import { RootStoreState } from 'app/root-store/';

@Injectable({ providedIn: 'root' })
export class BloggingFacadeService {
    blogging$ = this.store.select(selectBlogging);

    isThinking$ = this.store.select(selectIsThinking);

    canAutomateIdea$ = this.store.select(canAutomateIdea);

    automateIdea$ = this.store.select(selectAutomateIdea);

    constructor(private store: Store<RootStoreState.State>) {}
}
