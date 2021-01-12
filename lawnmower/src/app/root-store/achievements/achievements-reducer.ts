import { createReducer, on } from '@ngrx/store';
import { initialState, State } from './achievements-state';
import { unlockAchievementAction } from './achievements-action';
export const reducer = createReducer(
    initialState,
    on(unlockAchievementAction, (state: State, { id }) => ({
        ...state,
        achievements: { ...state.achievements, [id]: true },
    })),
);
