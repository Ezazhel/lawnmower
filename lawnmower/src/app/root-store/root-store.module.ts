import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsModule } from './stats';
import { StoreModule } from '@ngrx/store';
import { EarningModule } from './earning/earning.module';
import { NeighboorModule } from './neighboor/neighboor.module';

@NgModule({
    declarations: [],
    imports: [CommonModule, NeighboorModule, EarningModule, StatsModule, StoreModule.forRoot({})],
})
export class RootStoreModule {}
