import { createReducer, on } from '@ngrx/store';
import { cutAction, regrowAction } from './neighboor-action';
import { initialState, State } from './neighboor-state';

export const reducer = createReducer(
    initialState,
    on(cutAction, regrowAction, (state, { id, modifier }) => updateCompletion(state, id, modifier)),
);

function updateCompletion(state: State, id: number, modifier: number): State {
    return {
        ...state,
        neighboors: { ...state.neighboors, [0]: { completion: state.neighboors[id].completion + modifier } },
    };
}
