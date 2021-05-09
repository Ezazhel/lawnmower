import { Injectable } from '@angular/core';
import { Currency } from '@core/models/Currencies';
import { Store } from '@ngrx/store';
import { earnCurrency } from '@root-store/earning/earning-action';
import { selectAllCurrencies, selectImagination, selectMoney } from '@root-store/earning/earning-selector';
import { RootStoreState } from 'app/root-store/';

@Injectable({ providedIn: 'root' })
export class CurrencyFacadeService {
    currencies$ = this.store.select(selectAllCurrencies);

    money$ = this.store.select(selectMoney);

    imagination$ = this.store.select(selectImagination);

    constructor(private store: Store<RootStoreState.State>) {}

    earnCurrency(currency: Currency) {
        this.store.dispatch(earnCurrency({ currency }));
    }
}
