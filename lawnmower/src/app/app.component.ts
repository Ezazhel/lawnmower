import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import * as Hammer from 'hammerjs';
import { IdlingService } from './core/services/idling.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    @ViewChild(MatSidenav)
    public sidenav: MatSidenav;

    title = 'lawnmower';

    constructor(private _idlingService: IdlingService, elementRef: ElementRef) {
        const hammertime = new Hammer(elementRef.nativeElement, {});
        hammertime.on('panright', (event) => {
            if (event.center.x >= 1 && event.center.x <= 50) this.sidenav.open();
        });
        hammertime.on('panleft', (event) => {
            this.sidenav.close();
        });
    }

    ngOnInit() {
        this._idlingService.loop();
    }

    onToggleSideNav() {
        this.sidenav.toggle();
    }
}
