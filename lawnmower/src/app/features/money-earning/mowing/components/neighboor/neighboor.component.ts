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

    @Output()
    insertToCut = new EventEmitter<string>();

    constructor() {}

    ngOnInit(): void {}

    textToDisplay = () => {
        if (this.neighboor.cutPercent == 0 && !this.neighboor.selected) return '(click me)';
        if (this.neighboor.cutPercent > 0) return '(cutting)';
        if (this.neighboor.cutPercent == 0 && this.neighboor.selected) return '(will cut or click)';
    };

    cut() {
        if (!this.neighboor.selected || (this.neighboor.selected && this.neighboor.cutPercent == 0)) {
            this.insertToCut.next(this.neighboor.id);
            return;
        }
    }
}
