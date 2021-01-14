import { createAction, props } from '@ngrx/store';
export const incrementTotalMoney = createAction(
  '[STATS] Increment total money',
  props<{ money: number }>()
);
export const incrementTotalMowned = createAction(
  '[STATS] Increment total mowned',
  props<{ mowned: number }>()
);
