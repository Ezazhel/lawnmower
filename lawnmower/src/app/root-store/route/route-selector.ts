import { MemoizedSelector, createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './route-state';

export const selectRouteState: MemoizedSelector<object, State> = createFeatureSelector('routes');

export const selectAllRoute = createSelector(selectRouteState, (state) => [...Object.values(state.routes)]);
