import { Component, OnInit } from '@angular/core';
import { Creations } from '@core/data/creation-data';
import { Creation } from '@core/models/creation';
import { select, Store } from '@ngrx/store';
import { increaseCreationLevel, unlockCreation } from '@root-store/blogging/blogging-action';
import { selectCreations } from '@root-store/blogging/blogging-selector';
import { earnCurrency } from '@root-store/earning/earning-action';
import { selectCreationPoint } from '@root-store/earning/earning-selector';
import { RootStoreState } from 'app/root-store/';
import { Subject } from 'rxjs';
import { map, tap, withLatestFrom } from 'rxjs/operators';

@Component({
    selector: 'creations',
    templateUrl: './creations.component.html',
    styleUrls: ['./creations.component.scss'],
})
export class CreationsComponent implements OnInit {
    creations$ = this.store.pipe(
        select(selectCreations),
        tap((creations) => (this.price = this.basePrice + creations.length)),
    );
    creationToBuy$ = this.store.pipe(
        select(selectCreations),
        map((creations) => Object.values(Creations).filter((c) => !creations.find((creation) => creation.id == c.id))),
    );
    creationPoint$ = this.store.select(selectCreationPoint);

    basePrice: number = 2;
    price: number = this.basePrice;

    doUnlockCreation$ = new Subject();

    doUpgradeCreation$ = new Subject<Creation>();

    constructor(private store: Store<RootStoreState.State>) {}

    ngOnInit(): void {}

    unlockCreation = this.doUnlockCreation$
        .pipe(withLatestFrom(this.creationPoint$, this.creationToBuy$))
        .subscribe(([_, creationPoint, creationsToBuy]) => {
            if (creationPoint?.amount < this.price) return;

            const index = Math.floor(Math.random() * (creationsToBuy.length - 1));

            if (index == -1) return;

            this.store.dispatch(earnCurrency({ currency: { ...creationPoint, amount: -this.price } }));
            this.store.dispatch(unlockCreation({ id: creationsToBuy[index].id }));
        });

    upgradeCreation = this.doUpgradeCreation$
        .pipe(
            withLatestFrom(this.creationPoint$, (creation, creationPoint) => {
                if (!creationPoint) return;
                if (creation.level == creation.maxLevel) return;

                const price = creation.price(creation);

                if (price > creationPoint.amount) return;

                this.store.dispatch(earnCurrency({ currency: { ...creationPoint, amount: -price } }));
                this.store.dispatch(increaseCreationLevel({ id: creation.id }));
            }),
        )
        .subscribe();
}
