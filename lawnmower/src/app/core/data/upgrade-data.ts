import { Upgrade } from '@core/models/upgrade';

export const MowingUpgrade = {
    ['sharpen']: new Upgrade('Sharpen blade', 1, 'mowing', (): number => {
        return 1.1;
    }),
    ['rich-grass']: new Upgrade('Rich grass', 1, 'mowing', (): number => {
        return 1.15;
    }),
};
