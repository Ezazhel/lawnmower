export type BookAffect = 'creationGain' | 'readingSpeed' | 'ideaGain' | 'feature';

class Book {
    id: string;
    name: string;
    effect: (params?: number) => number;
    affect: BookAffect;
    chapterRead: number;
    timeToReadChapter: (chapterRead: number) => number; //more like a "time to complete chapter in second" Should make a function scaling based on chapter.
    timeRead: number; // again second here, progression / percent * 100 = %
    totalChapter: number;
    unlocked: boolean = false;
    effectDescription: string;
    reading: boolean;

    unlockCondition: (...params: any) => boolean;
    constructor(
        id: string,
        name: string,
        effectDescription: string,
        effect: (params: number) => number,
        affect: BookAffect,
        totalChapter: number,
        timeToReadChapter: (chapterRead: number) => number,
        unlockCondition?,
    ) {
        this.id = id;
        this.name = name;
        this.effectDescription = effectDescription;
        this.effect = effect;
        this.affect = affect;
        this.chapterRead = 0;
        this.totalChapter = totalChapter;
        this.timeToReadChapter = timeToReadChapter;
        this.timeRead = 0;
        this.unlockCondition = unlockCondition;
    }
}

export default Book;
