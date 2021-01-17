import { Neighboors } from '@core/data/neighboors-data';
import { createReducer, on } from '@ngrx/store';
import { cutAction, regrowAction, increaseCuttingLimit } from './neighboor-action';
import { initialState, State } from './neighboor-state';

export const reducer = createReducer(
    initialState,
    on(cutAction, regrowAction, (state, { id, modifier }) => updateCompletion(state, id, modifier)),
    on(increaseCuttingLimit, (state, { modifier }) => ({ ...state, cuttingLimit: state.cuttingLimit + modifier })),
);

function updateCompletion(state: State, id: string, modifier: number): State {
    const completionAfterModifier =
        modifier < 0
            ? Math.max((state.neighboors[id].completion ?? 0) + modifier, 0)
            : Math.min((state.neighboors[id].completion ?? 0) + modifier, Neighboors[id].maxCompletion);
    return {
        ...state,
        neighboors: {
            ...state.neighboors,
            [id]: {
                completion: completionAfterModifier,
                completedOnce:
                    state.neighboors[id].completedOnce || completionAfterModifier == Neighboors[id].maxCompletion,
            },
        },
    };
}
