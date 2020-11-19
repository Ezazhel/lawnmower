import { Component, OnInit } from '@angular/core';
import { menuLink } from '@shared/menu/menuLink';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  routes = menuLink;
  constructor() {}

  ngOnInit(): void {}

  getPath(tab: { path: string }, subTab: { path: string }) {
    return `${tab.path}/${subTab.path}`;
  }
}
