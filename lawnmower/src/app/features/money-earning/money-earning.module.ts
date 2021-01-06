import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MowingComponent } from './components/mowing/mowing.component';
import { BloggingComponent } from './components/blogging/blogging.component';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { UpgradesModule } from '../upgrades/upgrades.module';

@NgModule({
  declarations: [MowingComponent, BloggingComponent],
  imports: [
    CommonModule,
    SharedModule,
    UpgradesModule,
    RouterModule.forChild([
      {
        path: 'earning',
        children: [
          {
            path: 'mowing',
            component: MowingComponent,
          },
          {
            path: 'blogging',
            component: BloggingComponent,
          },
          { path: '**', redirectTo: 'mowing' },
        ],
      },
    ]),
  ],
  exports: [MowingComponent, BloggingComponent],
})
export class MoneyEarningModule {}
