import { Creativity } from '@core/models/currency';
import { Upgrade } from '@core/models/upgrade';
import { Store } from '@ngrx/store';
import { RootStoreState } from 'app/root-store';
import { earnCurrency } from 'app/root-store/earning/earning-action';
import { activateSubroute } from 'app/root-store/route/route-action';
import { routes } from './route-data';

export const MowingUpgrade = {
    ['sharpen']: new Upgrade(
        'sharpen',
        'Sharpen blade',
        (level) => 0.0425 * Math.pow(1.2, level),
        'mowing',
        'Sharp blade will cut grass faster',
        0,
        5,
        'You cut grass 5% faster per level',
        'speed',
        (level: number): number => Math.pow(1.05, level),
    ),
    ['rich-grass']: new Upgrade(
        'rich-grass',
        'Rich grass',
        () => 0.1,
        'mowing',
        'It seems that your neighboor money come from their grasses !',
        0,
        1,
        '15% more money from cutting grass',
        'gain',
        (): number => 1.15,
    ),
    ['anti-fertilizer']: new Upgrade(
        'anti-fertilizer',
        'Anti Fertilizer',
        (level) => 0.25 * Math.pow(1.4, level),
        'mowing',
        'What if you spray something on the grass ?',
        0,
        3,
        'Grass regrow 5% slower',
        'regrow',
        (level: number): number => Math.pow(1.05, level),
    ),
    ['robot']: new Upgrade(
        'robot',
        'Robot',
        () => 0.3,
        'mowing',
        'Hello there',
        0,
        1,
        'You can cut one more grass before needing to click',
        'cuttingLimit',
        () => 1,
    ),
    ['flower']: new Upgrade(
        'flower',
        'Flower',
        () => 15,
        'mowing',
        'For mommy',
        0,
        1,
        'Unlock a new feature !',
        'feature',
        (store: Store<RootStoreState.State>) => {
            store.dispatch(activateSubroute({ mainRoute: routes['earning'], subRoute: routes['earning'].subPath[1] }));
        },
    ),
};

export const BloggingUpgrade = {
    ['paper_pencils']: new Upgrade(
        'paper_pencils',
        'Paper & Pencils',
        () => 5,
        'blogging',
        'What should you do with paper and pencil ? Draw !',
        0,
        1,
        'Unlock creativity !',
        'feature',
        (store: Store<RootStoreState.State>) => {
            store.dispatch(earnCurrency({ currency: { ...new Creativity() } }));
        },
        'I',
    ),
    ['handy']: new Upgrade(
        'handy',
        'Lefty or Righty ?',
        () => 10,
        'blogging',
        "It's time to know Kenny...!",
        0,
        1,
        'Improve imagination gain !',
        null,
        () => {},
        'C',
    ),
};
