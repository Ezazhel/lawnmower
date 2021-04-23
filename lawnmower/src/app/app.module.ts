import { NeighboorService } from './core/services/neighboor.service';
import { BloggingService } from './core/services/blogging.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@shared/material/material.module';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MoneyEarningModule } from './features/money-earning/money-earning.module';
import { AppRoutingModule } from './app-routing.module';
import { FooterHeaderModule } from '@shared/footer-header/footer-header.module';
import { RootStoreModule } from './root-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { Exponential } from './shared/pipes/exponential.pipe';
import { NotificationsModule } from '@feature/notifications/notifications.module';
@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        FlexLayoutModule,
        MoneyEarningModule,
        AppRoutingModule,
        FooterHeaderModule,
        RootStoreModule,
        NotificationsModule,
        StoreDevtoolsModule.instrument({
            name: 'lawnmoner',
            maxAge: 10,
        }),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
