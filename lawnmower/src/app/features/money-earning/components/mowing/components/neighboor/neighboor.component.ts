import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
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

    constructor(private changeDetectorRef: ChangeDetectorRef) {}

    ngOnInit(): void {}
}
