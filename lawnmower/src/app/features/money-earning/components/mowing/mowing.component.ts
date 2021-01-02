import { Component, OnInit } from '@angular/core';
import { Neighboors } from '@core/data/neighboors-data';
import { IdlingService } from '@core/services/idling.service';
import { Store } from '@ngrx/store';
import { RootStoreState } from 'app/root-store';
import { NeighboorAction } from 'app/root-store/neighboor';
import { Neighboor } from '../../../../core/models/neighboor';
@Component({
    selector: 'mowing',
    templateUrl: './mowing.component.html',
    styleUrls: ['./mowing.component.scss'],
})
export class MowingComponent implements OnInit {
    neighboors = Neighboors;

    constructor(private store: Store<RootStoreState.State>, private idlingService: IdlingService) {}

    ngOnInit(): void {}

    cut = (neighboor: Neighboor) => {
        let interval = setInterval(() => {
            neighboor.cut();
            if (neighboor.cutPercent >= 100) {
                this.store.dispatch(NeighboorAction.cutAction({ id: 0, modifier: 1 }));
                neighboor.cutCompleted();
                if (!neighboor.regrowing) this.regrow(neighboor);
                window.clearInterval(interval);
            }
        }, 50);
    };

    regrow = (neighboor: Neighboor) => {
        neighboor.regrowing = true;
        let interval = setInterval(() => {
            neighboor.regrow();
            if (neighboor.regrowPercent <= 0) {
                this.store.dispatch(NeighboorAction.regrowAction({ id: 0, modifier: -1 }));
                neighboor.regrowCompleted();
                if (neighboor.completion <= 0) {
                    neighboor.regrowing = false;
                    window.clearInterval(interval);
                }
            }
        }, 50);
    };

    trackByFunction(index: number, object: any) {
        return object;
    }
}
