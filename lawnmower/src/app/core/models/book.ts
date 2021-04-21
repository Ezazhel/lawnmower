type BookAffect = 'creationGain' | 'readingSpeed' | 'ideaGain';

class Book {
    id: string;
    name: string;
    effect: (params?: number) => number;
    affect: BookAffect;
    chapterRead: number;
    readingPercent: number; //more like a "time to complete chapter in second" Should make a function scaling based on chapter.
    readingProgression: number; // again second here, progression / percent * 100 = %
    totalChapter: number;
    unlocked: boolean = false;
    effectDescription: string;
    reading: boolean;
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
