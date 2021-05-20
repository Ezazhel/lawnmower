import { Creation } from '@core/models/creation';
import { Idea } from '@core/models/Currencies';

export const Creations = {
    ['cortex']: new Creation(
        'cortex',
        'Cortex',
        'Increase Idea Limit',
        'IdeaLimit',
        5,
        ({ level }) => level,
        ({ level }: Creation, idea: Idea) => (idea.limit += level),
    ),
    ['board']: new Creation(
        'board',
        'Board',
        'Improve Creation Gain',
        'CreationGain',
        2,
        ({ level }) => 3 + 2 * level,
        ({ level }: Creation, gain: number) => (gain += level),
    ),
    ['poster']: new Creation(
        'poster',
        'Poster',
        'Reduce price for idea',
        'IdeaGain',
        2,
        ({ level }) => 3 + level,
        ({ level }: Creation) => 0.5 * level,
    ),
};
