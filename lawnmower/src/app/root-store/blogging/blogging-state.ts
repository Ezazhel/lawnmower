import { Books } from '@core/data/book-data';
import { Blogging } from '@core/models/blogging';
import Book from '@core/models/book';
export interface State {
    blogging: Blogging;
    isThinking: boolean;
    books: {
        [id: string]: Partial<Book>;
    };
}

export const initialState: State = {
    blogging: new Blogging(),
    isThinking: false,
    books: Books,
};
