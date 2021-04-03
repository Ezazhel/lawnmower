import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Upgrade } from '@core/models/upgrade';

@Component({
    selector: 'app-upgrade',
    templateUrl: './upgrade.component.html',
    styleUrls: ['./upgrade.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpgradeComponent implements OnInit {
    @Input()
    upgrade: Upgrade;

    @Input()
    currency: number;

    constructor() {}

    ngOnInit(): void {}
}
