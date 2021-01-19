import { Route } from '@core/models/route';

export const routes = {
    ['earning']: new Route('Earning', '$', 'earning', 0, true, [
        new Route('Mowing', 'M', 'mowing', 0, true),
        new Route('Blogging', 'B', 'blogging', 1, false),
    ]),
    ['achievements']: new Route('Achievements', 'A', 'achievements', 1, true),
    ['stats']: new Route('Statistics', 'S', 'stats', 2, true),
};
