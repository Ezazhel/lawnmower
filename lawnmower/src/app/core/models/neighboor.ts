export class Neighboor {
    title: string;
    completion: number;
    maxCompletion: number;
    subTitle: string;
    content: string;
    lastTimeCut: number = null;
    lastTimeRegrow: number = null;
    cutPercent: number = 0;
    regrowPercent: number = 100;
    regrowing: boolean = false;
    time: number;
    regrowTime: number;
    income: number;
    constructor(
        title: string,
        completion: number,
        maxCompletion: number,
        subTitle: string,
        content: string,
        time: number,
        regrowTime: number,
        income: number,
    ) {
        this.title = title;
        this.completion = completion;
        this.maxCompletion = maxCompletion;
        this.subTitle = subTitle;
        this.content = content;
        this.time = time;
        this.regrowTime = regrowTime;
        this.income = income;
    }

    cut = (modifier: number) => {
        let now = Date.now();
        if (this.lastTimeCut == null) this.lastTimeCut = now;
        const delta = now - this.lastTimeCut;
        this.cutPercent += ((delta * modifier) / this.time) * 100;
        this.lastTimeCut = now;
    };
    cutCompleted = () => {
        this.cutPercent = 0;
        this.lastTimeCut = null;
    };

    regrow = (modifier: number) => {
        const now = Date.now();
        if (this.lastTimeRegrow == null) this.lastTimeRegrow = now;
        const delta = now - this.lastTimeRegrow;
        this.regrowPercent -= ((delta * modifier) / this.regrowTime) * 100;
        this.lastTimeRegrow = now;
    };

    regrowCompleted = () => {
        this.regrowPercent = 100;
        this.lastTimeRegrow = null;
    };
}
