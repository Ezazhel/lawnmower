import { Books } from '@core/data/book-data';
import { Creations } from '@core/data/creation-data';
import Book, { BookAffect } from '@core/models/book';
import { Creation } from '@core/models/creation';
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

export const selectCanBuyBook = createSelector(selectBlogFeature, (state) => state.canBuyBook);

export const selectCreations = createSelector(selectBlogFeature, (state) => {
    let obj = Object.keys(state.creations).map(
        (k) => Object.assign(Creations[k], { level: state.creations[k] }) as Creation,
    );
    return obj;
});
