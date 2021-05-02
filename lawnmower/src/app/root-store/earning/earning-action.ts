import { Currency } from '@core/models/Currencies/Currency';
import { createAction, props } from '@ngrx/store';
export const earnCurrency = createAction('[Earning] Currency', props<{ currency: Currency }>());

export const getIdea = createAction('[Blogging] Get an idea'); //replace by earnCurrency
export const unlockIdea = createAction('[Blogging] Unlock Idea'); //earn Currency
export const useIdea = createAction('[Blogging] Use Idea', props<{ used: number }>()); //earn currency
export const canPayDollarForIdea = createAction('[Bloggin] Unlock feature for Idea'); //keep that one.
export const updateTimer = createAction('[Earning] Update Timer', props<{ timer: any }>());
