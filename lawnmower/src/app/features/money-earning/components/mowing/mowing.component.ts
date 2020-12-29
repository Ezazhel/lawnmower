import { Component, OnInit } from '@angular/core';
import { Neighboors } from '@core/data/neighboors-data';
import { IdlingService } from '@core/services/idling.service';
import { Neighboor } from '../../../../core/models/neighboor';
@Component({
    selector: 'mowing',
    templateUrl: './mowing.component.html',
    styleUrls: ['./mowing.component.scss'],
})
export class MowingComponent implements OnInit {
    neighboors = Neighboors;

    constructor(private idlingService: IdlingService) {}

    ngOnInit(): void {}

    cut = (neighboor: Neighboor) => {
        let interval = setInterval(() => {
            neighboor.cut();
            if (neighboor.cutPercent >= 100) {
                this.idlingService.earnMoney(1);
                neighboor.cutCompleted();
                if (!neighboor.regrowing) this.regrow(neighboor);
                window.clearInterval(interval);
            }
        }, 50);
    };

    regrow = (neighboor: Neighboor) => {
        neighboor.regrowing = true;
        let interval = setInterval(() => {
            neighboor.regrow();
            if (neighboor.regrowPercent <= 0) {
                neighboor.regrowCompleted();
                if (neighboor.completion <= 0) {
                    neighboor.regrowing = false;
                    window.clearInterval(interval);
                }
            }
        }, 50);
    };

    trackByFunction(index: number, object: any) {
        return object;
    }
}
