import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducer } from './stats-reducer';
import { EffectsModule } from '@ngrx/effects';
import { StatEffects } from './stats-effects';

@NgModule({
    declarations: [],
    imports: [CommonModule, StoreModule.forFeature('stats', reducer), EffectsModule.forFeature([StatEffects])],
    providers: [StatEffects],
})
export class StatsModule {}
