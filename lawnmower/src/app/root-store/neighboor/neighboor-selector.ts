import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { State } from './neighboor-state';
import { Neighboors } from '@core/data/neighboors-data';
import { Neighboor } from '@core/models/neighboor';

const getNeighboorCompletion = (state: State, neighboorId: number): number => state.neighboors[neighboorId].completion;

export const selectNeighboorState: MemoizedSelector<object, State> = createFeatureSelector('neighboor');

export const getCompletion = createSelector(selectNeighboorState, getNeighboorCompletion);

export const getAllNeighboors: MemoizedSelector<object, Neighboor[]> = createSelector(selectNeighboorState, (state) => {
    console.log("[Getall N] : state.n",state.neighboors['n1']);
   let t = Object.keys(state.neighboors).map(
       (key) => Object.assign(Neighboors[key], {...state.neighboors[key]}) as Neighboor);
   console.log("neighboor selector ",t[0].cutPercent, t[0].regrowPercent, t);
   return t;
}
);

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
