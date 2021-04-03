import { BloggingService } from './core/services/blogging.service';
import { Component } from '@angular/core';
import { IdlingService } from './core/services/idling.service';
import { NeighboorService } from './core/services/neighboor.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'lawnmower';

    constructor(
        private _idlingService: IdlingService,
        private neighboorService: NeighboorService,
        private bloggingService: BloggingService,
    ) {}

    ngOnInit() {}
}
