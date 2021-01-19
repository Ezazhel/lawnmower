import { Component, OnInit } from '@angular/core';
import { Blogging } from '@core/models/blogging';
import { Store } from '@ngrx/store';
import { RootStoreState } from 'app/root-store';
import { getBlogging } from 'app/root-store/blogging/blogging-selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'blogging',
  templateUrl: './blogging.component.html',
  styleUrls: ['./blogging.component.scss'],
})
export class BloggingComponent implements OnInit {

  blogging$ : Observable<Blogging> = this.store.select(getBlogging);
  constructor(private store: Store<RootStoreState.State>) {}

  ngOnInit(): void {}
}
