import Book from '@core/models/book';

export const Books = {
    ['davinci']: new Book(
        'davinci',
        'Da Vinci',
        'Boost creation gain chance by 5%',
        (chapterRead: number) => 5 * chapterRead,
        'creationGain',
        5,
        (chapter) => (1 + chapter) * (1 * 60),
    ),
    ['encyclopedia']: new Book(
        'encyclopedia',
        'Encyclopedia',
        'Each book read will give 25% speed reading',
        (totalBook: number) => 1.25 * totalBook,
        'readingSpeed',
        1,
        () => 2 * 60,
        true,
    ),
    ['journal']: new Book(
        'journal',
        'Journal',
        'Gain double Idea',
        (ideaGain: number) => ideaGain * 2,
        'ideaGain',
        1,
        () => 3 * 60,
        true,
    ),
    ['genius']: new Book(
        'genius',
        'How to become a genius',
        'Automate idea purchase',
        () => 0,
        'feature',
        1,
        () => 30,
    ),
    ['nerd']: new Book(
        'nerd',
        'Nerd 101',
        'Increase idea limit',
        (level) => level,
        'ideaLimit',
        5,
        (chapterRead) => 15 * chapterRead,
        true,
    ),
};
