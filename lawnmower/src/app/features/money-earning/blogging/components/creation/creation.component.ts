import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCreations } from '@root-store/blogging/blogging-selector';
import { RootStoreState } from 'app/root-store/';

@Component({
    selector: 'creation',
    templateUrl: './creation.component.html',
    styleUrls: ['./creation.component.scss'],
})
export class CreationComponent implements OnInit {
    creations$ = this.store.select(selectCreations);
    constructor(private store: Store<RootStoreState.State>) {}

    ngOnInit(): void {}
}
