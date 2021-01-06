import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootStoreState } from 'app/root-store';
import { withLatestFrom } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UpgradesService {

  constructor(private store: Store<RootStoreState.State>) { }

  unlockUpgrade = (id: string) =>
  {
    //Withlatest from EarningState.money, upgrades[id]
    //check if money >= upgrade.price
    //update store with upgrades[id] : true.
    this.store.pipe(withLatestFrom());
  }
}
