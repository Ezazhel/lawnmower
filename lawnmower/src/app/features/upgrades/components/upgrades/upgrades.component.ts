import { Component, OnInit } from '@angular/core';
import { MowingUpgrade } from '@core/data/upgrade-data';
import { Upgrade } from '@core/models/upgrade';

@Component({
  selector: 'upgrades',
  templateUrl: './upgrades.component.html',
  styleUrls: ['./upgrades.component.scss']
})
export class UpgradesComponent implements OnInit {
  upgrades = [...Object.values(MowingUpgrade)];
  constructor() { }

  ngOnInit(): void {
  }

  trackByFunction(index: number, object: Upgrade) {
    return index;
}
}
