import { createAction, props } from '@ngrx/store';
export const earnMoney = createAction(
  '[Earning] Money',
  props<{ money: number }>()
);
