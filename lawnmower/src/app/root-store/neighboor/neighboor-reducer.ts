import { createReducer, on } from '@ngrx/store';
import { cutAction, regrowAction, increaseCuttingLimit } from './neighboor-action';
import { initialState, State } from './neighboor-state';
import { Neighboors } from '../../core/data/neighboors-data';

export const reducer = createReducer(
    initialState,
    on(cutAction, regrowAction, (state, { id, modifier }) => updateCompletion(state, id, modifier)),
    on(increaseCuttingLimit, (state, { modifier }) => ({ ...state, cuttingLimit: state.cuttingLimit + modifier })),
);

function updateCompletion(state: State, id: string, modifier: number): State {
    return {
        ...state,
        completions: {
            ...state.completions,
            [id]:
                modifier < 0
                    ? Math.max((state.completions[id] ?? 0) + modifier, 0)
                    : Math.min((state.completions[id] ?? 0) + modifier, Neighboors[id].maxCompletion),
        },
    };
}
