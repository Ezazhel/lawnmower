import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpgradesComponent } from './components/upgrades/upgrades.component';
import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [UpgradesComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[UpgradesComponent]
})
export class UpgradesModule { }
