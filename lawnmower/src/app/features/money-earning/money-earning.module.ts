import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MowingComponent } from './components/mowing/mowing.component';
import { BloggingComponent } from './components/blogging/blogging.component';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MowingComponent, BloggingComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: 'mowing',
        component: MowingComponent,
      },
      {
        path: 'blogging',
        component: BloggingComponent,
      },
    ]),
  ],
  exports: [MowingComponent, BloggingComponent],
})
export class MoneyEarningModule {}
