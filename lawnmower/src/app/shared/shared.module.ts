import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { PortalModule } from '@angular/cdk/portal';
@NgModule({
  declarations: [],
  imports: [CommonModule, MaterialModule, PortalModule],
  exports: [MaterialModule],
})
export class SharedModule {}
