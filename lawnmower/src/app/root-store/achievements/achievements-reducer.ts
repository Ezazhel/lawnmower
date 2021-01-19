import { createReducer, on } from '@ngrx/store';
import { initialState, State } from './achievements-state';
import { unlockAchievementAction, addAchievements } from './achievements-action';
export const reducer = createReducer(
    initialState,
    on(unlockAchievementAction, (state: State, { id }) => ({
        ...state,
        achievements: { ...state.achievements, [id]: true },
    })),
    on(addAchievements, (state, { Achievements }) => ({
        ...state,
        achievements: Object.keys(Achievements).reduce(
            (acc, next) => Object.assign({ ...acc, [next]: false }),
            state.achievements,
        ),
    })),
);
