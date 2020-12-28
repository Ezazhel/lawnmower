import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'earning',
    loadChildren: () =>
      import('./features/money-earning/money-earning.module').then(
        (m) => m.MoneyEarningModule
      ),
  },
  { path: '', redirectTo: 'earning', pathMatch: 'full' },
  { path: '**', redirectTo: 'earning', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
