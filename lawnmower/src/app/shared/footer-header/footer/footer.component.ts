import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { menuLink } from '@shared/menu/menuLink';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  routes = menuLink;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  getPath(tab: { path: string }, subTab: { path: string }) {
    return `${tab.path}/${subTab.path}`;
  }

  navigate(path: string) {
    console.log(path);
    this.router.navigateByUrl(path);
  }
}
