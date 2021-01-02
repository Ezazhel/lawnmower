import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { State } from './neighboor-state';

const getNeighboorCompletion = (state: State, id: number): number => state.neighboors[id].completion;

export const selectNeighboorState: MemoizedSelector<object, State> = createFeatureSelector('neighboor');

export const selectNeighboorCompletion = createSelector(selectNeighboorState, (state, id) =>
    getNeighboorCompletion(state, id),
);

export const getCompletion = createSelector(selectNeighboorState, getNeighboorCompletion);
