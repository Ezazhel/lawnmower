import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducer } from './neighboor-reducer';

@NgModule({
    declarations: [],
    imports: [CommonModule, StoreModule.forFeature('neighboor', reducer)],
})
export class NeighboorModule {}
