import { Neighboors } from '@core/data/neighboors-data';
import { createReducer, on } from '@ngrx/store';
import {
    cutActionCompleted as cutActionCompleted,
    regrowActionCompleted as regrowActionCompleted,
    increaseCuttingLimit,
    regrowAction,
    cutAction,
    insertOrUpdateNeighboorToCut,
    insertNeighboorToRegrow,
    removeNeighboorFromCuttingList,
} from './neighboor-action';
import { initialState, State } from './neighboor-state';
import { removeNeighboorFromRegrowList } from './neighboor-action';

export const reducer = createReducer(
    initialState,
    on(cutActionCompleted, regrowActionCompleted, (state, { id, modifier }) => updateCompletion(state, id, modifier)),
    on(regrowAction, (state, { id, regrowPercent }) => updateRegrow(state, id, regrowPercent)),
    on(cutAction, (state, { id, cutPercent }) => updateCut(state, id, cutPercent)),
    on(insertNeighboorToRegrow, (state, { id }) => ({ ...state, neighboorToRegrow: [...state.neighboorToRegrow, id] })),
    on(insertOrUpdateNeighboorToCut, (state, { id, cutted }) => insertOrUpdateCut(state, id, cutted)),
    on(removeNeighboorFromCuttingList, (state, { id }) => removeFromCuttingList(state, id)),
    on(removeNeighboorFromRegrowList, (state, { id }) => ({
        ...state,
        neighboorToRegrow: state.neighboorToRegrow.filter((n) => n != id),
    })),
    on(increaseCuttingLimit, (state, { modifier }) => ({ ...state, cuttingLimit: state.cuttingLimit + modifier })),
);

function updateCompletion(state: State, id: string, modifier: number): State {
    const completionAfterModifier =
        modifier < 0
            ? Math.max((state.neighboors[id].completion ?? 0) + modifier, 0)
            : Math.min((state.neighboors[id].completion ?? 0) + modifier, Neighboors[id].maxCompletion);
    let newState = {
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
    if (modifier > 0) {
        newState = {
            ...newState,
            neighboorToCutAndCuttedTime: {
                ...newState.neighboorToCutAndCuttedTime,
                [id]: state.neighboorToCutAndCuttedTime[id] + 1,
            },
        };
    }
    return newState;
}

function updateRegrow(state: State, id: string, regrowPercent: number): State {
    return {
        ...state,
        neighboors: {
            ...state.neighboors,
            [id]: {
                ...state.neighboors[id],
                regrowPercent: regrowPercent,
            },
        },
    };
}

function updateCut(state: State, id: string, cutPercent: number): State {
    return {
        ...state,
        neighboors: {
            ...state.neighboors,
            [id]: {
                ...state.neighboors[id],
                cutPercent: cutPercent,
            },
        },
    };
}

function insertOrUpdateCut(state: State, id: string, cutted: number) {
    return {
        ...state,
        neighboorToCutAndCuttedTime: {
            ...state.neighboorToCutAndCuttedTime,
            [id]: state.neighboorToCutAndCuttedTime[id] ?? 0 + cutted,
        },
    };
}

function removeFromCuttingList(state: State, id: string) {
    const remove = { ...state.neighboorToCutAndCuttedTime };
    delete remove[id];
    return { ...state, neighboorToCutAndCuttedTime: remove };
}
