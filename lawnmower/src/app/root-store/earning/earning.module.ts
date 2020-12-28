import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, StoreModule } from '@ngrx/store';
import { reducer } from './earning-reducer';

@NgModule({
  declarations: [],
  imports: [CommonModule, StoreModule.forFeature('earning', reducer)],
})
export class EarningModule {}
