import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromComponents from './components';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../../shared/shared.module';
import { UpgradesModule } from '../../../upgrades/upgrades.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NeighboorComponent } from './components/neighboor/neighboor.component';

const routes: Routes = [
    {
        path: '',
        component: fromComponents.MowingComponent,
    },
];

@NgModule({
    declarations: [...fromComponents.components, NeighboorComponent],
    imports: [CommonModule, SharedModule, UpgradesModule, RouterModule.forChild(routes), FlexLayoutModule],
})
export class MowingModule {}
