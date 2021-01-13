import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { reducer } from './route-reducer';
import { StoreModule } from '@ngrx/store';

@NgModule({
    declarations: [],
    imports: [CommonModule, StoreModule.forFeature('routes', reducer)],
})
export class RouteModule {}
