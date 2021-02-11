import { createAction, props } from '@ngrx/store';
export const incrementTotalMoney = createAction('[STATS] Increment total money', props<{ money: number }>());
export const incrementTotalMowned = createAction('[STATS] Increment total mowned', props<{ mowned: number }>());

export const incrementTotalImagination = createAction(
    '[STATS] Increment total imagination',
    props<{ imagination: number }>(),
);

export const incrementTotalCreativity = createAction(
    '[STATS] Increment total creativity',
    props<{ creativity: number }>(),
);
