import { createReducer, on } from '@ngrx/store';
import { cutAction, regrowAction } from './neighboor-action';
import { initialState, State } from './neighboor-state';

export const reducer = createReducer(
    initialState,
    on(cutAction, regrowAction, (state, { id, modifier }) => updateCompletion(state, id, modifier)),
);

function updateCompletion(state: State, id: string, modifier: number): State {
    return {
        ...state,
        completions: {
            ...state.completions,
            [id]:
                modifier < 0
                    ? Math.max((state.completions[id] ?? 0) + modifier, 0)
                    : Math.min((state.completions[id] ?? 0) + modifier, 100),
        },
    };
}
