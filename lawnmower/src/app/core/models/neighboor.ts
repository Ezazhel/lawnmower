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

    cut = () => {
        let cutTime = Date.now();
        if (this.lastTimeCut == null) this.lastTimeCut = cutTime;
        let deltaTime = cutTime - this.lastTimeCut;
        this.cutPercent += (deltaTime / this.time) * 100;
        this.lastTimeCut = cutTime;
    };
    cutCompleted = () => {
        this.completion += 1;
        this.cutPercent = 0;
        this.lastTimeCut = null;
    };

    regrow = () => {
        let regrowtTime = Date.now();
        if (this.lastTimeRegrow == null) this.lastTimeRegrow = regrowtTime;
        let deltaTime = regrowtTime - this.lastTimeRegrow;
        this.regrowPercent -= (deltaTime / this.regrowTime) * 100;
        this.lastTimeRegrow = regrowtTime;
    };

    regrowCompleted = () => {
        this.completion -= 1;
        this.regrowPercent = 100;
        this.lastTimeRegrow = null;
    };
}
