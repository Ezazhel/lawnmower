import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromComponents from './components';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../../shared/shared.module';
import { UpgradesModule } from '../../../upgrades/upgrades.module';
import { FlexLayoutModule } from '@angular/flex-layout';

const routes: Routes = [
    {
        path: '',
        component: fromComponents.MowingComponent,
    },
];

@NgModule({
    declarations: [...fromComponents.components],
    imports: [CommonModule, SharedModule, UpgradesModule, RouterModule.forChild(routes), FlexLayoutModule],
})
export class MowingModule {}
