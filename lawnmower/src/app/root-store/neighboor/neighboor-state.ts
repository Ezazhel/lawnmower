import { Neighboor } from '@core/models/neighboor';
import { Neighboors } from '@core/data/neighboors-data';
export interface State {
    completions: {
        [neighboorId: number]: number;
    };
}

export const initialState: State = {
    completions: {
        [0]: Neighboors[0].completion,
    },
};
