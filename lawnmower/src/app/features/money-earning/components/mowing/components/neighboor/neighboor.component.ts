import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Neighboor } from '@core/models/neighboor';

@Component({
    selector: 'app-neighboor',
    templateUrl: './neighboor.component.html',
    styleUrls: ['./neighboor.component.scss'],
})
export class NeighboorComponent implements OnInit {
    @Input()
    neighboor: Neighboor;

    constructor() {}

    ngOnInit(): void {}
}
