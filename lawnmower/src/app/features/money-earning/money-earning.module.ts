import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MowingComponent } from './components/mowing/mowing.component';
import { BloggingComponent } from './components/blogging/blogging.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [MowingComponent, BloggingComponent],
  imports: [CommonModule, SharedModule],
  exports: [MowingComponent, BloggingComponent],
})
export class MoneyEarningModule {}
