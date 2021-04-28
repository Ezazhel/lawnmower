import { Books } from '@core/data/book-data';
import Book, { BookAffect } from '@core/models/book';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { State } from './blogging-state';

export const selectBlogFeature: MemoizedSelector<object, State> = createFeatureSelector('blogging');

export const selectBlogging = createSelector(selectBlogFeature, (state) => state.blogging);

export const selectIsThinking = createSelector(selectBlogFeature, (state) => state.isThinking);

export const selectBooks = createSelector(selectBlogFeature, (state) =>
    Object.keys(state.books).map((k) => Object.assign({} as Book, Books[k], state.books[k]) as Book),
);

export const selectReadingBooks = createSelector(selectBooks, (Books) => Books.filter((b) => b.reading));

export const selectBookBonus = createSelector(selectBooks, (Books: Book[], affect: BookAffect) => {
    return Books.filter((b) => b.affect == affect);
});

export const selectAutomateIdea = createSelector(selectBlogFeature, (state) => state.automateIdea);
