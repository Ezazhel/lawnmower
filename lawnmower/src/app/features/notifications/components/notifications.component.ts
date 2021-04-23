import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NotifierService } from '@core/services/notifier.service';
import { notifyAnimation } from '../notifications.animation';

@Component({
    selector: 'notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss'],
    animations: [notifyAnimation],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsComponent implements OnInit {
    notifications$ = this._notifierService.notifications$;

    constructor(private _notifierService: NotifierService) {}

    trackByFn(index: number, el: Notification) {
        return index;
    }

    ngOnInit(): void {}
}
