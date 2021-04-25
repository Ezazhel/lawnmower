import { Books } from '@core/data/book-data';
import { Blogging } from '@core/models/blogging';
import Book from '@core/models/book';
import { Idea } from '@core/models/idea';
export interface State {
    blogging: Blogging;
    isThinking: boolean;
    idea: Idea;
    books: {
        [id: string]: Partial<Book>;
    };
}

export const initialState: State = {
    blogging: new Blogging(),
    isThinking: false,
    idea: null,
    books: {
        ...Books,
        [Books.davinci.id]: { ...Books.davinci, unlocked: true },
    },
};
