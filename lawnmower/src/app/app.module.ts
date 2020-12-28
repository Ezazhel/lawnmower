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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
