import { Upgrade } from '@core/models/upgrade';

export const MowingUpgrade = {
    ['sharpen']: new Upgrade('sharpen', 'Sharpen blade', 0.001, 'mowing', (): number => {
        return 1.1;
    }),
    ['rich-grass']: new Upgrade('rich-grass', 'Rich grass', 0.1, 'mowing', (): number => {
        return 1.15;
    }),
};
