import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '@shared/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from 'app/app-routing.module';
import { SharedModule } from '../shared.module';

@NgModule({
    declarations: [FooterComponent, HeaderComponent],
    imports: [CommonModule, MaterialModule, FlexLayoutModule, AppRoutingModule, SharedModule],
    exports: [FooterComponent, HeaderComponent],
})
export class FooterHeaderModule {}
