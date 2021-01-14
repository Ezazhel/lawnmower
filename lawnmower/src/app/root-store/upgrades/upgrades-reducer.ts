import { createReducer, on } from '@ngrx/store';
import { unlockMowingUpgradeAction, unlockGlobalUpgradeAction, addMowingUpgradeAction } from './upgrades-action';
import { initialState, State } from './upgrades-state';

export const reducer = createReducer(
    initialState,
    on(unlockMowingUpgradeAction, (state, { id }) => updateMowingUpgrade(state, id)),
    on(unlockGlobalUpgradeAction, (state, { id }) => unlockGlobalUpgrade(state, id)),
    on(addMowingUpgradeAction, (state, { id}) => updateMowingUpgrade(state,id, false))
);

function updateMowingUpgrade(state: State, id: string, isUnlock = true): State {
    return { ...state, mowing: { ...state.mowing, [id]: isUnlock } };
}

function unlockGlobalUpgrade(state: State, id: string): State {
    return { ...state, global: { ...state.global, [id]: true } };
}
