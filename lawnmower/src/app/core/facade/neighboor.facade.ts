import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { getAllNeighboors } from '@root-store/neighboor/neighboor-selector';
import { NeighboorAction, RootStoreState } from 'app/root-store/';
import { timeoutWith } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NeighboorFacadeService {
    neighboors$ = this.store.select(getAllNeighboors);
    constructor(private store: Store<RootStoreState.State>) {}

    insertNeighboorToCut(id: string) {
        this.store.dispatch(NeighboorAction.insertNeighboorToCut({ id, cutted: 0 }));
    }
}
