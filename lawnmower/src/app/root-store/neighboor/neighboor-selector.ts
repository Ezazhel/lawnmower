import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { State } from './neighboor-state';
import { Neighboors } from '@core/data/neighboors-data';
import { Neighboor } from '@core/models/neighboor';

const getNeighboorCompletion = (state: State, neighboorId: number): number => state.neighboors[neighboorId].completion;

export const selectNeighboorState: MemoizedSelector<object, State> = createFeatureSelector('neighboor');

export const getCompletion = createSelector(selectNeighboorState, getNeighboorCompletion);

export const getAllNeighboors: MemoizedSelector<object, Neighboor[]> = createSelector(selectNeighboorState, (state) => {
    return Object.keys(state.neighboors).map((key) =>
        Object.assign(new Neighboor(), Neighboors[key], state.neighboors[key]),
    );
});

export const getAllNeighboorsWhereCompletionGtOne = createSelector(selectNeighboorState, (state) =>
    Object.keys(state.neighboors)
        .map(
            (key): Neighboor =>
                Object.assign<Neighboor, Partial<Neighboor>>(Neighboors[key], {
                    completion: state.neighboors[key].completion,
                    completedOnce: state.neighboors[key].completedOnce,
                }),
        )
        .filter((n) => n.completion > 0),
);

export const selectCuttingLimit = createSelector(selectNeighboorState, (state) => state.cuttingLimit);

export const selectEquippedTool = createSelector(selectNeighboorState, (state) =>
    Object.values(state.tools).find((t) => t.equipped),
);

export const selectNeighboorToCut = createSelector(selectNeighboorState, (state) => {
    return Object.keys(state.neighboorToCutAndCuttedTime).map(
        (key) =>
            Object.assign(new Neighboor(), Neighboors[key], state.neighboors[key], {
                cuttedTime: state.neighboorToCutAndCuttedTime[key],
            }) as Neighboor,
    );
});

export const selectNeighboorToRegrow = createSelector(selectNeighboorState, (state) => {
    return state.neighboorToRegrow.map(
        (key) => Object.assign(new Neighboor(), Neighboors[key], state.neighboors[key]) as Neighboor,
    );
});
