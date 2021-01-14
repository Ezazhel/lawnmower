import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsComponent } from './components/stats/stats.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [StatsComponent],
  imports: [
    CommonModule,
    SharedModule,
    FlexLayoutModule,
    RouterModule.forChild([
      {
        path : '',
        component: StatsComponent
      }
    ])
  ]
})
export class StatsModule { }
