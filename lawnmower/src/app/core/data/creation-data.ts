import { Creation } from '@core/models/creation';

export const Creations = {
    ['cortex']: new Creation('cortex', 'Cortex', 'Increase Idea Limit', 5, ({ level }) => level),
    ['board']: new Creation('board', 'Board', 'Improve Creation Gain', 2, ({ level }) => 3 + 2 * level),
    ['poster']: new Creation('poster', 'Poster', 'Reduce price for idea', 2, ({ level }) => 3 + level),
};
