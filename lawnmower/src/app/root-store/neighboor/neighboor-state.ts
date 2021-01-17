import { Neighboors } from '@core/data/neighboors-data';

export interface StateNeighboor {
    completion: number;
    completedOnce: boolean;
}
export interface State {
    cuttingLimit: number;
    neighboors: {
        [neighboorId: string]: StateNeighboor;
    };
}

export const initialState: State = {
    cuttingLimit: 1,
    neighboors: {
        [Neighboors['n1'].id]: { completion: Neighboors['n1'].completion, completedOnce: false },
    },
};
