import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Neighboor } from '@core/models/neighboor';

@Component({
    selector: 'app-neighboor',
    templateUrl: './neighboor.component.html',
    styleUrls: ['./neighboor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NeighboorComponent implements OnInit {
    @Input()
    neighboor: Neighboor;

    @Output('onCut')
    onCut: EventEmitter<Neighboor> = new EventEmitter();

    constructor() {}

    ngOnInit(): void {}

    cut() {
        console.log('emit : ', this.neighboor);
        this.onCut.emit(this.neighboor);
    }
}
