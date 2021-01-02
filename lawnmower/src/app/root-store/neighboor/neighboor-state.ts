import { Neighboor } from '@core/models/neighboor';
import { Neighboors } from '@core/data/neighboors-data';
export interface State {
    neighboors: Partial<Neighboor>[];
}

export const initialState: State = {
    neighboors: [{ completion: Neighboors[0].completion }],
};
