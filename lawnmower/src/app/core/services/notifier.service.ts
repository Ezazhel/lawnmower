import { Injectable } from '@angular/core';
import { EmptyError, merge, Observable, Subject } from 'rxjs';
import { map, scan } from 'rxjs/operators';

enum ActionType {
    push = 'push',
    pop = 'pop',
}

interface Action {
    type: ActionType;
    payload?: string;
}

@Injectable({
    providedIn: 'root',
})
export class NotifierService {
    notifications$: Observable<Notification[]>;
    private pushSource = new Subject<string>();
    private popSource = new Subject<void>();
    constructor() {
        const push$ = this.pushSource.pipe(map((payload) => ({ type: ActionType.push, payload })));

        const pop$ = this.popSource.pipe(map((_) => ({ type: ActionType.pop, payload: null })));

        this.notifications$ = merge(push$, pop$).pipe(
            scan((acc: any, { payload, type }) => {
                if (type === ActionType.pop) {
                    acc = acc.slice(0, -1);
                }
                if (type === ActionType.push) {
                    acc = [...acc, payload];
                }
                return acc;
            }, []),
        );
    }

    pushMessage(msg: string, duration = 3000) {
        this.pushSource.next(msg);
        setTimeout(() => this.popMessage(), duration);
    }

    private popMessage() {
        this.popSource.next();
    }
}
