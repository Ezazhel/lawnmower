import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav/sidenav.component';
import { NavtabComponent } from './navtab/navtab.component';

@NgModule({
  declarations: [SidenavComponent, NavtabComponent],
  imports: [CommonModule],
  exports: [SidenavComponent, NavtabComponent],
})
export class MenuModule {}
