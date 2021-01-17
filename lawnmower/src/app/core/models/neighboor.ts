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
    regrowing: boolean = false;
    cutting: boolean = false;
    time: number;
    regrowTime: number;
    income: number;
    constructor(
        id: string,
        title: string,
        completion: number,
        maxCompletion: number,
        subTitle: string,
        content: string,
        time: number,
        regrowTime: number,
        income: number,
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

    cut = (deltaTime: number, modifier: number) => {
        this.cutPercent += ((deltaTime * modifier) / this.time) * 100;
    };

    cutCompleted = () => {
        this.cutting = false;
        this.cutPercent = 0;
        this.lastTimeCut = null;
    };

    regrow = (deltaTime: number, modifier: number) => {
        this.regrowPercent -= ((deltaTime * modifier) / this.regrowTime) * 100;
    };

    regrowCompleted = () => {
        this.regrowPercent = 100;
    };
}
