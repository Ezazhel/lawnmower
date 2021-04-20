import Book from '@core/models/book';

export const Books = {
    ['davinci']: new Book('davinci', 'Da Vinci', (chapterRead: number) => 5 * chapterRead, 'creationGain', 5),
    ['encyclopedia']: new Book(
        'encyclopedia',
        'Encyclopedia',
        (totalBook: number) => 1.25 * totalBook,
        'readingSpeed',
        1,
    ),
    ['journal']: new Book('journal', 'Journal', (ideaGain: number) => ideaGain * 2, 'ideaGain', 1),
};
