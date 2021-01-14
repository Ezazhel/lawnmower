import { Neighboors } from '@core/data/neighboors-data';
export interface State {
    cuttingLimit: number;
    completions: {
        [neighboorId: number]: number;
    };
}

export const initialState: State = {
    cuttingLimit: 1,
    completions: {
        [Neighboors['n1'].id]: Neighboors['n1'].completion,
    },
};
