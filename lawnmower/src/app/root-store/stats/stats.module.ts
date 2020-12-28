import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducer } from './stats-reducer';

@NgModule({
  declarations: [],
  imports: [CommonModule, StoreModule.forFeature('stats', reducer)],
})
export class StatsModule {}
