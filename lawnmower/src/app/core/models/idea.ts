export class Idea {
    own: number;
    basePrice: number;

    constructor() {
        this.own = 0;
        this.basePrice = 0.5;
    }
    price() {
        return this.basePrice * Math.pow(1.35, this.own);
    }
    bonusToImagination() {
        return Math.pow(1.15, this.own);
    }
}
