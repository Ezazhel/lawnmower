import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { State } from './neighboor-state';
import { Neighboors } from '@core/data/neighboors-data';
import { Neighboor } from '../../core/models/neighboor';

const getNeighboorCompletion = (state: State, neighboorId: number): number => state.completions[neighboorId];

export const selectNeighboorState: MemoizedSelector<object, State> = createFeatureSelector('neighboor');

export const getCompletion = createSelector(selectNeighboorState, getNeighboorCompletion);

export const getAllNeighboors: MemoizedSelector<object, Neighboor[]> = createSelector(selectNeighboorState, (state) =>
    Object.keys(state.completions).map((key) => Object.assign(Neighboors[key], state.completions[key])),
);
