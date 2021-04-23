import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './components/notifications.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    declarations: [NotificationsComponent],
    imports: [CommonModule, FlexLayoutModule],
    exports: [NotificationsComponent],
})
export class NotificationsModule {}
