import { createAction, props } from '@ngrx/store';
export const incrementTotalMoney = createAction('[STATS] Increment total money', props<{ money: number }>());
export const incrementTotalMowned = createAction('[STATS] Increment total mowned', props<{ mowned: number }>());

export const incrementTotalImagination = createAction(
    '[STATS] Increment total imagination',
    props<{ imagination: number }>(),
);

export const incrementTotalCreation = createAction('[STATS] Increment total creation', props<{ creation: number }>());

export const incrementTotalFailedCreation = createAction(
    '[STATS] Increment total failed creation',
    props<{ number: number }>(),
);

export const incrementTotalIdea = createAction('[STATS] Increment total idea', props<{ idea: number }>());
