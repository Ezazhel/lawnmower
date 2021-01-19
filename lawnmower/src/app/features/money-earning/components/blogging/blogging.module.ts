import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { UpgradesModule } from 'app/features/upgrades/upgrades.module';


import * as fromComponents from "./components";
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: fromComponents.BloggingComponent
}]
@NgModule({
  declarations: [ ...fromComponents.components],
  imports: [
    CommonModule,
    SharedModule,
    UpgradesModule,
    RouterModule.forChild(routes)
  ],
  exports: [ fromComponents.BloggingComponent]
})
export class BloggingModule { }
