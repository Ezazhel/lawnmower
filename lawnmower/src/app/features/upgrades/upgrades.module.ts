import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import * as fromComponents from './components';
@NgModule({
    declarations: [...fromComponents.components],
    imports: [CommonModule, SharedModule],
    exports: [fromComponents.UpgradesComponent],
})
export class UpgradesModule {}
