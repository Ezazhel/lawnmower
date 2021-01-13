export class Route {
    label: string;
    singleSymbol: string;
    path: string;
    index: number;
    isActive: boolean;
    subPath: Route[];

    constructor(
        label: string,
        singleSymbol: string,
        path: string,
        index: number,
        isActive: boolean,
        subPath?: Route[],
    ) {
        this.label = label;
        this.path = path;
        this.singleSymbol = singleSymbol;
        this.index = index;
        this.isActive = isActive;
        this.subPath = subPath ?? null;
    }
}
