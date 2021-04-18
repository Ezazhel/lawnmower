import { createReducer, on } from '@ngrx/store';
import {
    unlockMowingUpgradeAction,
    unlockGlobalUpgradeAction,
    addMowingUpgradeAction,
    unlockBloggingUpgradeAction,
    addBloggingUpgradeAction,
} from './upgrades-action';
import { initialState, State } from './upgrades-state';

export const reducer = createReducer(
    initialState,
    on(unlockMowingUpgradeAction, (state, { id }) => updateMowingUpgrade(state, id)),
    on(unlockGlobalUpgradeAction, (state, { id }) => unlockGlobalUpgrade(state, id)),
    on(unlockBloggingUpgradeAction, (state, { id }) => unlockBloggingUpgrade(state, id)),
    on(addMowingUpgradeAction, (state, { id }) => updateMowingUpgrade(state, id, 0)),
    on(addBloggingUpgradeAction, (state, { id }) => updateBloggingUpgrade(state, id, 0)),
);

function updateMowingUpgrade(state: State, id: string, level: number = null): State {
    return { ...state, mowing: { ...state.mowing, [id]: level ?? state.mowing[id] + 1 } };
}

function updateBloggingUpgrade(state: State, id: string, level: number): State {
    return { ...state, blogging: { ...state.blogging, [id]: level ?? state.blogging[id] + 1 } };
}

function unlockGlobalUpgrade(state: State, id: string, level: number = undefined): State {
    return { ...state, global: { ...state.global, [id]: level ?? state.global[id] + 1 } };
}

function unlockBloggingUpgrade(state: State, id: string, level: number = undefined): State {
    return { ...state, blogging: { ...state.blogging, [id]: level ?? state.blogging[id] + 1 } };
}
