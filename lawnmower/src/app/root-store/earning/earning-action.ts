import { Currency } from '@core/models/currency';
import { createAction, props } from '@ngrx/store';
export const earnCurrency = createAction('[Earning] Currency', props<{ currency: Currency }>());
