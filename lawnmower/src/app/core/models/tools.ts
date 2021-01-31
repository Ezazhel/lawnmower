export class Accesories {}
export class Tools {
    id: string;
    power: number; //Cutting power, speed up cutting time
    refill: number; //Reduce time to wait between each cut
    tank: number; //How many default cut can we do with this tool
    accesories?: Accesories[];

    constructor(id: string, power: number, refill: number, tank: number) {
        this.id = id;
        this.power = power;
        this.refill = refill;
        this.tank = tank;
    }
}
