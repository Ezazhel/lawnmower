export class Neighboor {
    id: string;
    title: string;
    completion: number;
    maxCompletion: number;
    completedOnce: boolean = false;
    subTitle: string;
    content: string;
    lastTimeCut: number = null;
    lastTimeRegrow: number = null;
    cutPercent: number = 0;
    regrowPercent: number = 100;
    selected: boolean = false;
    time: number;
    regrowTime: number;
    income: number;
    cuttedTime: number;

    constructor(
        id?: string,
        title?: string,
        completion?: number,
        maxCompletion?: number,
        subTitle?: string,
        content?: string,
        time?: number,
        regrowTime?: number,
        income?: number,
    ) {
        this.id = id;
        this.title = title;
        this.completion = completion;
        this.maxCompletion = maxCompletion;
        this.subTitle = subTitle;
        this.content = content;
        this.time = time;
        this.regrowTime = regrowTime;
        this.income = income;
    }
}
