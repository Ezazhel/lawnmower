import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { State } from './blogging-state';

export const selectBlogFeature: MemoizedSelector<object, State> = createFeatureSelector('blogging');

export const selectBlogging = createSelector(selectBlogFeature, (state) => state.blogging);

export const selectImagination = createSelector(selectBlogFeature, (state) => state.blogging.imagination);
export const selectCreativity = createSelector(selectBlogFeature, (state) => state.blogging.creativity);

export const selectBloggingCurrencies = createSelector(selectBlogFeature, (state) => [
    state.blogging.creativity,
    state.blogging.imagination,
]);
