import { Neighboors } from '@core/data/neighboors-data';
export interface State {
    completions: {
        [neighboorId: number]: number;
    };
}

export const initialState: State = {
    completions: {
        [Neighboors['n1'].id]: Neighboors['n1'].completion,
    },
};
