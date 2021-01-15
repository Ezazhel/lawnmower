import { Upgrade } from '@core/models/upgrade';
import { Store } from '@ngrx/store';
import { RootStoreState } from 'app/root-store';
import { increaseCuttingLimit } from 'app/root-store/neighboor/neighboor-action';

export const MowingUpgrade = {
    ['sharpen']: new Upgrade(
        'sharpen',
        'Sharpen blade',
        0.025,
        'mowing',
        'Sharp blade will cut grass faster',
        'You cut grass 10% faster',
        'speed',
        (): number => {
            return 1.1;
        },
    ),
    ['rich-grass']: new Upgrade(
        'rich-grass',
        'Rich grass',
        0.1,
        'mowing',
        'It seems that your neighboor money come from their grasses !',
        '15% more money from cutting grass',
        'gain',
        (): number => {
            return 1.15;
        },
    ),
    ['anti-fertilizer']: new Upgrade(
        'anti-fertilizer',
        'Anti Fertilizer',
        1,
        'mowing',
        'What if you spray something on the grass ?',
        'Grass regrow 5% slower',
        'regrow',
        (): number => {
            return 0.9;
        },
    ),
    ['robot']: new Upgrade(
        'robot',
        'Robot',
        7.5,
        'mowing',
        'Hello there',
        'You can cut one more grass before needing to click',
        'cuttingLimit',
        () => {
            return 1;
        },
    ),
};
