type BookAffect = 'creationGain' | 'readingSpeed' | 'ideaGain';

class Book {
    id: string;
    name: string;
    effect: (chapterRead: number) => number;
    affect: BookAffect;
    chapterRead: number;
    readingPercent: number;
    totalChapter: number;
    constructor(id: string, name: string, effect, affect: BookAffect, totalChapter: number) {
        this.id = id;
        this.name = name;
        this.effect = effect;
        this.affect = affect;
        this.chapterRead = 0;
        this.totalChapter = totalChapter;
    }
}

export default Book;
