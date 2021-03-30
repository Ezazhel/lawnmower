import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import * as Hammer from 'hammerjs';
import { IdlingService } from './core/services/idling.service';
import { NeighboorService } from './core/services/neighboor.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    @ViewChild(MatSidenav)
    public sidenav: MatSidenav;

    title = 'lawnmower';

    constructor(
        private _idlingService: IdlingService,
        elementRef: ElementRef,
        private neighboorService: NeighboorService,
    ) {}

    ngOnInit() {}
}
