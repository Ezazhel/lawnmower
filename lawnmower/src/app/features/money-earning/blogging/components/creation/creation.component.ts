import { Component, OnInit } from '@angular/core';
import { Creations } from '@core/data/creation-data';
import { select, Store } from '@ngrx/store';
import { unlockCreation } from '@root-store/blogging/blogging-action';
import { selectCreations } from '@root-store/blogging/blogging-selector';
import { earnCurrency } from '@root-store/earning/earning-action';
import { selectCreation } from '@root-store/earning/earning-selector';
import { RootStoreState } from 'app/root-store/';
import { Subject } from 'rxjs';
import { tap, withLatestFrom } from 'rxjs/operators';

@Component({
    selector: 'creation',
    templateUrl: './creation.component.html',
    styleUrls: ['./creation.component.scss'],
})
export class CreationComponent implements OnInit {
    creations$ = this.store.pipe(
        select(selectCreations),
        tap((creations) => (this.price = this.basePrice + creations.length)),
    );

    creationPoint$ = this.store.select(selectCreation);

    basePrice: number = 2;
    price: number = this.basePrice;

    doUnlockCreation$ = new Subject();

    constructor(private store: Store<RootStoreState.State>) {}

    ngOnInit(): void {}

    unlockCreation = this.doUnlockCreation$
        .pipe(withLatestFrom(this.creationPoint$, this.creations$))
        .subscribe(([_, creationPoint, creations]) => {
            if (creationPoint.amount < this.price) return;
            const creationUnlockable = Object.values(Creations).filter(
                (c) => !creations.find((creation) => creation.id == c.id),
            );
            const index = Math.floor(Math.random() * (creationUnlockable.length - 1));
            this.store.dispatch(unlockCreation({ id: creationUnlockable[index].id }));
            this.store.dispatch(earnCurrency({ currency: { ...creationPoint, amount: -this.price } }));
        });
}
