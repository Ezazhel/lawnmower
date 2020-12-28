import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootStoreState, EarningAction, StatsAction } from 'app/root-store';

@Injectable({
  providedIn: 'root',
})
export class IdlingService {
  constructor(private store: Store<RootStoreState.State>) {}

  earnMoney(money: number) {
    console.log('idling service', money);
    this.store.dispatch(EarningAction.earnMoney({ money }));
    this.store.dispatch(StatsAction.incrementTotalMoney({ money }));
  }
}
