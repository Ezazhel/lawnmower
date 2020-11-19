import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'earning', pathMatch: 'full' },
  {
    path: 'earning',
    loadChildren: () =>
      import('./features/money-earning/money-earning.module').then(
        (m) => m.MoneyEarningModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
