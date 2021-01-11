import { Upgrade } from '@core/models/upgrade';
import { AffectType } from '../models/upgrade';

export const MowingUpgrade = {
    ['sharpen']: new Upgrade(
        'sharpen',
        'Sharpen blade',
        0.001,
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
};
