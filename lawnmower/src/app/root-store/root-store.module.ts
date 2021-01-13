import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsModule } from './stats';
import { StoreModule } from '@ngrx/store';
import { EarningModule } from './earning/earning.module';
import { NeighboorModule } from './neighboor/neighboor.module';
import { UpgradeModule } from './upgrades/uprades.module';
import { AchievementsModule } from './achievements/achievements.module';
import { RouteModule } from './route/route.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        NeighboorModule,
        EarningModule,
        StatsModule,
        UpgradeModule,
        AchievementsModule,
        RouteModule,
        StoreModule.forRoot({}),
    ],
})
export class RootStoreModule {}
