import { Neighboors } from '@core/data/neighboors-data';
import { createReducer, on } from '@ngrx/store';
import { cutActionCompleted as cutActionCompleted, regrowActionCompleted as regrowActionCompleted, increaseCuttingLimit, regrowAction, cutAction } from './neighboor-action';
import { initialState, State } from './neighboor-state';

export const reducer = createReducer(
    initialState,
    on(cutActionCompleted, regrowActionCompleted, (state, { id, modifier }) => updateCompletion(state, id, modifier)),
    on(regrowAction, (state, {id, regrowPercent}) => updateRegrow(state, id, regrowPercent)),
    on(cutAction, (state,{id, cutPercent})=> updateCut(state,id, cutPercent)),
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
                ...state.neighboors[id],
                completion: completionAfterModifier,
                completedOnce:
                    state.neighboors[id].completedOnce || completionAfterModifier == Neighboors[id].maxCompletion,
            },
        },
    };
}

function updateRegrow(state:State, id:string, regrowPercent: number): State{
    return {
        ...state,
        neighboors: {
            ...state.neighboors,
            [id]:{
                ...state.neighboors[id],
                regrowPercent: regrowPercent
            }
        }
    }
}

function updateCut(state:State, id:string, cutPercent: number):State{
    return  {
        ...state,
        neighboors: {
            ...state.neighboors,
            [id]:
            {
                ...state.neighboors[id],
                cutPercent: cutPercent
            }
        }
    }
}
