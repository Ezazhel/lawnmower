import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { reducer } from './achievements-reducer';
import { StoreModule } from '@ngrx/store';

@NgModule({
    declarations: [],
    imports: [CommonModule, StoreModule.forFeature('achievements', reducer)],
})
export class AchievementsModule {}
