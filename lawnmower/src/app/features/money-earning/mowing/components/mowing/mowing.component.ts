import { Component, OnInit } from '@angular/core';
import { Neighboor } from '@core/models/neighboor';
import { Observable } from 'rxjs';
import { NeighboorFacadeService } from '@core/facade/neighboor.facade';
import { UpgradeState } from 'app/root-store/upgrades';
@Component({
    selector: 'mowing',
    templateUrl: './mowing.component.html',
    styleUrls: ['./mowing.component.scss'],
})
export class MowingComponent implements OnInit {
    upgradeTab: keyof UpgradeState.State = 'mowing';
    neighboors$: Observable<Neighboor[]> = this.neighboorFacade.neighboors$;
    constructor(private neighboorFacade: NeighboorFacadeService) {}

    ngOnInit(): void {}

    trackByFunction(index: number, object: Neighboor) {
        return object.id;
    }

    insertToCut(id: string) {
        this.neighboorFacade.insertNeighboorToCut(id);
    }
}
