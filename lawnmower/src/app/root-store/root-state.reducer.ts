import { createReducer, on } from '@ngrx/store';
import { RootStoreState } from '.';
import { loadGame } from './root-state.action';

export const reducer = createReducer(
    on(loadGame, (state: RootStoreState.State, { gameState }) => {
        debugger;
        return gameState;
    }),
);
