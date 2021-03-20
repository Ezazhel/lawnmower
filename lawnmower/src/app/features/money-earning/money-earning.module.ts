import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { UpgradesModule } from '../upgrades/upgrades.module';
@NgModule({
    declarations: [],
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
                        loadChildren: () => import('./components/mowing/mowing.module').then((m) => m.MowingModule),
                    },
                    {
                        path: 'blogging',
                        loadChildren: () =>
                            import('./components/blogging/blogging.module').then((m) => m.BloggingModule),
                    },
                    { path: '**', redirectTo: 'mowing' },
                ],
            },
        ]),
    ],
    exports: [],
})
export class MoneyEarningModule {}
