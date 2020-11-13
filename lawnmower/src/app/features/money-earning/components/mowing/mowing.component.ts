import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'mowing',
  templateUrl: './mowing.component.html',
  styleUrls: ['./mowing.component.scss'],
})
export class MowingComponent implements OnInit {
  neighboors = Array(5)
    .fill(0)
    .map((v, i) => i + 1);
  constructor() {}

  ngOnInit(): void {}
}
