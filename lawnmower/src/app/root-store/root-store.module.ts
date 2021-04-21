import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsModule } from './stats/stats.module';
import { StoreModule } from '@ngrx/store';
import { EarningModule } from './earning/earning.module';
import { NeighboorModule } from './neighboor/neighboor.module';
import { UpgradeModule } from './upgrades/uprades.module';
import { AchievementsModule } from './achievements/achievements.module';
import { RouteModule } from './route/route.module';
import { BloggingModule } from './blogging/blogging.module';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StatsModule,
        NeighboorModule,
        BloggingModule,
        EarningModule,
        UpgradeModule,
        AchievementsModule,
        RouteModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
    ],
})
export class RootStoreModule {}
