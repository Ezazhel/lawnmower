import { MowingUpgrade } from '@core/data/upgrade-data';
export interface State {
    global: { [id: string]: boolean };
    mowing: { [id: string]: boolean };
}

export const initialState: State = {
    global: {},
    mowing: {
        [MowingUpgrade.sharpen.id]: false,
        [MowingUpgrade['rich-grass'].id]: false,
        [MowingUpgrade['anti-fertilizer'].id]: false
    },
};
