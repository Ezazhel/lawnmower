import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { UpgradesModule } from 'app/features/upgrades/upgrades.module';

import * as fromComponents from './components';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ActionsComponent } from './components/actions/actions.component';

const routes: Routes = [
    {
        path: '',
        component: fromComponents.BloggingComponent,
    },
];
@NgModule({
    declarations: [...fromComponents.components, ActionsComponent],
    imports: [CommonModule, SharedModule, UpgradesModule, FlexLayoutModule, RouterModule.forChild(routes)],
})
export class BloggingModule {}
