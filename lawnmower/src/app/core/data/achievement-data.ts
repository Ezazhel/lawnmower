import { RootStoreState } from 'app/root-store';
import { Achievement } from '../models/achievement';

export const Achievements = {
    ['a1']: new Achievement(
        'a1',
        'Small fortune',
        'Gain a dollar',
        (state: RootStoreState.State) => state.earning.money >= 0.01,
        () => {},
    ),
    ['a2']: new Achievement(
        'a2',
        'Little worker',
        'Have a city with more than 10 completion',
        (state: RootStoreState.State) => Object.values(state.neighboor.completions).some((c) => c > 10),
        () => {},
    ),
};
