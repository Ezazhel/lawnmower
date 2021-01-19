import { createFeatureSelector, createSelector, MemoizedSelector } from "@ngrx/store";
import { State } from "./blogging-state";


export const getBlogFeature : MemoizedSelector<object, State> = createFeatureSelector("blogging");

export const getBlogging = createSelector(getBlogFeature, state => state.blogging);