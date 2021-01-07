import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducer } from './upgrades-reducer';

@NgModule({
    declarations: [],
    imports: [CommonModule, StoreModule.forFeature('upgrades', reducer)],
})
export class UpgradeModule {}
