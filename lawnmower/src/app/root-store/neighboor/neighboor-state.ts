import { Neighboors } from '@core/data/neighboors-data';
import { Tools } from '@core/models/tools';
import { tools as toolsData } from '@core/data/tools-data';

export interface StateNeighboor {
    completion: number;
    completedOnce: boolean;
    cutPercent: number;
    regrowPercent: number;
}
export interface State {
    cuttingLimit: number;
    neighboors: {
        [neighboorId: string]: StateNeighboor;
    };
    neighboorToCutAndCuttedTime: {
        [neighboorId: string]: number;
    };
    neighboorToRegrow: string[];
    tools: {
        [toolsId: string]: Tools;
    };
}

export const initialState: State = {
    cuttingLimit: 1,
    neighboors: {
        [Neighboors['n1'].id]: {
            completion: Neighboors['n1'].completion,
            completedOnce: false,
            cutPercent: Neighboors['n1'].cutPercent,
            regrowPercent: Neighboors['n1'].regrowPercent,
        },
    },
    neighboorToCutAndCuttedTime: {},
    neighboorToRegrow: [],
    tools: {
        [toolsData.hands.id]: toolsData.hands,
    },
};
