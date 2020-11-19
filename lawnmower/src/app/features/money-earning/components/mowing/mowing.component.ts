import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
const Neighboors = [
  {
    title: 'MowingTown',
    completion: 0,
    maxCompletion: 100,
    subTitle: 'Somewhere to start',
    content: `
      First neighborhood, easy cleaning, slow income
      income per neighbors : 0.0012$
  `,
    time: 5000,
  },
];
@Component({
  selector: 'mowing',
  templateUrl: './mowing.component.html',
  styleUrls: ['./mowing.component.scss'],
})
export class MowingComponent implements OnInit {
  neighboors = Neighboors;
  value: number = 0;
  constructor(public sanitize: DomSanitizer) {}

  ngOnInit(): void {}

  launchInterval(time: number) {
    let counter: number = 0;
    let interval = setInterval(() => {
      if (++counter && counter <= time / 1000) {
        this.value += (1000 / time) * 100;
      } else {
        this.value = 0;
        window.clearInterval(interval);
      }
    }, 1000);
  }
}
