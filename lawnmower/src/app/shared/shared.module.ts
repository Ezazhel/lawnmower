import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { Exponential } from './pipes/exponential.pipe';
@NgModule({
    declarations: [Exponential],
    imports: [CommonModule, MaterialModule],
    exports: [MaterialModule, Exponential],
})
export class SharedModule {}
