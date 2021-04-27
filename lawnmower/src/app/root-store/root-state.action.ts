import { createAction, props } from '@ngrx/store';
import { RootStoreState } from '.';

export const loadGame = createAction('[GAME] Load game', props<{ gameState: RootStoreState.State }>());
