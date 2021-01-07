import { createReducer, on } from '@ngrx/store';
import { unlockMowingUpgradeAction, unlockGlobalUpgradeAction } from './upgrades-action';
import { initialState, State } from './upgrades-state';

export const reducer = createReducer(
    initialState,
    on(unlockMowingUpgradeAction, (state, { id }) => unlockMowingUpgrade(state, id)),
    on(unlockGlobalUpgradeAction, (state, { id }) => unlockGlobalUpgrade(state, id)),
);

function unlockMowingUpgrade(state: State, id: string): State {
    return { ...state, mowing: { ...state.mowing, [id]: true } };
}

function unlockGlobalUpgrade(state: State, id: string): State {
    return { ...state, global: { ...state.global, [id]: true } };
}
