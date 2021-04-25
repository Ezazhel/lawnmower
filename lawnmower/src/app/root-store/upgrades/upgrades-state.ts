import { MowingUpgrade } from '@core/data/upgrade-data';
import { BloggingUpgrade } from '../../core/data/upgrade-data';
export interface State {
    global: { [id: string]: number };
    mowing: { [id: string]: number };
    blogging: { [id: string]: number };
}

export const initialState: State = {
    global: {},
    mowing: {},
    blogging: {
        [BloggingUpgrade.paper_pencils.id]: BloggingUpgrade.paper_pencils.level,
        [BloggingUpgrade.handy.id]: BloggingUpgrade.handy.level,
        [BloggingUpgrade.ideas.id]: BloggingUpgrade.ideas.level,
    },
};
