import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header>
      <mat-toolbar color="primary">
        <div fxHide.gt-xs>
          <button mat-icon-button (click)="onToggleSideNav()">
            <mat-icon>menu</mat-icon>
          </button>
        </div>
        <div>Lawnmoner</div>
      </mat-toolbar>
    </header>
  `,
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
  onToggleSideNav = () => {
    this.sidenavToggle.emit();
  };
}
