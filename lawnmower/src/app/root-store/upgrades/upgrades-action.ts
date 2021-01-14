import { createAction, props } from '@ngrx/store';
export const unlockGlobalUpgradeAction = createAction('[Upgrade] Unlock global upgrade', props<{ id: string }>());
export const unlockMowingUpgradeAction = createAction('[Upgrade] Unlock mowing upgrade', props<{ id: string }>());
export const unlockBloggingUpgradeAction = createAction('[Upgrade] Unlock blogging upgrade', props<{ id: string }>());

export const addMowingUpgradeAction = createAction('[Upgrade] Add mowing upgrade', props<{ id: string }>());