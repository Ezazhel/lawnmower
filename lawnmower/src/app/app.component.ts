import { Component } from '@angular/core';

export interface PeriodicElement {
  size: number;
  time: number;
  pay: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { size: 1, time: 5 * 60, pay: 10 },
  { size: 2, time: 5 * 60, pay: 10 },
  { size: 3, time: 5 * 60, pay: 10 },
  { size: 4, time: 5 * 60, pay: 10 },
  { size: 5, time: 5 * 60, pay: 10 },
  { size: 6, time: 5 * 60, pay: 10 },
  { size: 7, time: 5 * 60, pay: 10 },
  { size: 8, time: 5 * 60, pay: 10 },
  { size: 9, time: 5 * 60, pay: 10 },
  { size: 10, time: 5 * 60, pay: 10 },
];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'lawnmower';
  displayedColumns: string[] = ['size', 'time', 'pay'];
  dataSource = ELEMENT_DATA;
  breakpoint: number;
  ngOnInit() {
    this.breakpoint = window.innerWidth <= 720 ? 1 : 4;
  }

  onResize(event) {
    this.breakpoint = event.target.innerWidth <= 720 ? 1 : 4;
  }

  tabChanged(event) {
    console.log(event);
  }
}
