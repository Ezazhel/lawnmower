import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootStoreState } from 'app/root-store';
import { selectEquippedTool } from 'app/root-store/neighboor/neighboor-selector';

@Component({
    selector: 'tools',
    templateUrl: './tools.component.html',
    styleUrls: ['./tools.component.scss'],
})
export class ToolsComponent implements OnInit {
    equippedTool$ = this.store.select(selectEquippedTool);
    constructor(private store: Store<RootStoreState.State>) {}

    ngOnInit(): void {}
}
