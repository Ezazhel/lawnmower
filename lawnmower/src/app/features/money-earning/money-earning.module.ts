import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MowingComponent } from './components/mowing/mowing.component';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { UpgradesModule } from '../upgrades/upgrades.module';

@NgModule({
  declarations: [MowingComponent],
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
            loadChildren: () => import('./components/blogging/blogging.module').then(m => m.BloggingModule)
          },
          { path: '**', redirectTo: 'mowing' },
        ],
      },
    ]),
  ],
  exports: [MowingComponent],
})
export class MoneyEarningModule {}
