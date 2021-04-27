import { createAction, props } from '@ngrx/store';
import { RootStoreState } from '..';

export const hydrate = createAction('[Hydration] Hydrate');

export const hydrateSuccess = createAction('[Hydration] Hydrate Success', props<{ state: RootStoreState.State }>());

export const hydrateFailure = createAction('[Hydration] Hydrate Failure');
