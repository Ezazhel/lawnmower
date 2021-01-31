import { Neighboors } from '@core/data/neighboors-data';
import { Tools } from '@core/models/tools';
import { tools as toolsData } from '@core/data/tools-data';

export interface StateNeighboor {
    completion: number;
    completedOnce: boolean;
}
export interface State {
    cuttingLimit: number;
    neighboors: {
        [neighboorId: string]: StateNeighboor;
    };
    tools: {
        [toolsId: string]: Tools;
    };
}

export const initialState: State = {
    cuttingLimit: 1,
    neighboors: {
        [Neighboors['n1'].id]: { completion: Neighboors['n1'].completion, completedOnce: false },
    },
    tools: {
        [toolsData.hands.id]: toolsData.hands,
    },
};
