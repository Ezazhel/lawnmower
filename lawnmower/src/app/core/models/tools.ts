export class Accesories {}
export class Tools {
    id: string;
    name: string;
    power: number; //Cutting power, speed up cutting time
    refill: number; //Reduce time to wait between each cut
    tank: number; //How many default cut can we do with this tool
    accesories?: Accesories[];
    equipped: boolean;

    constructor(id: string, name: string, power: number, refill: number, tank: number, equipped: boolean) {
        this.id = id;
        this.name = name;
        this.power = power;
        this.refill = refill;
        this.tank = tank;
        this.equipped = equipped;
    }
}
