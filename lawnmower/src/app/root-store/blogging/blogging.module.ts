import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducer } from './blogging-reducer';

@NgModule({
    declarations: [],
    imports: [CommonModule, StoreModule.forFeature('blogging', reducer)],
})
export class BloggingModule {}
