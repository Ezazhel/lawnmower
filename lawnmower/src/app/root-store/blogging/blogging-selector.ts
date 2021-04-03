import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { State } from './blogging-state';

export const selectBlogFeature: MemoizedSelector<object, State> = createFeatureSelector('blogging');

export const selectBlogging = createSelector(selectBlogFeature, (state) => state.blogging);

export const selectIsThinking = createSelector(selectBlogFeature, (state) => state.isThinking);
export const selectIsCreating = createSelector(selectBlogFeature, (state) => state.isCreating);
export const selectIsGettingIdea = createSelector(selectBlogFeature, (state) => state.isGettingIdea);
