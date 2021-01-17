import { MowingUpgrade } from '@core/data/upgrade-data';
export interface State {
    global: { [id: string]: number };
    mowing: { [id: string]: number };
}

export const initialState: State = {
    global: {},
    mowing: {
        [MowingUpgrade.sharpen.id]: MowingUpgrade.sharpen.level,
        [MowingUpgrade['rich-grass'].id]: MowingUpgrade['rich-grass'].level,
        [MowingUpgrade['anti-fertilizer'].id]: MowingUpgrade['anti-fertilizer'].level,
    },
};
