import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { menuLink } from '@shared/menu/menuLink';
import { filter, take } from 'rxjs/operators';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
    routes = menuLink;
    indexForTabPrincipal = 0;
    @ViewChild('tabPrincipal')
    tabPrincipal: MatTabGroup;
    constructor(private router: Router) {
        this.router.events
            .pipe(
                filter((e) => e instanceof NavigationEnd),
                take(1),
            )
            .subscribe((navEnd: NavigationEnd) => {
                this.indexForTabPrincipal = this.routes.find(
                    (r) => r.path == navEnd.urlAfterRedirects.split('/')[1],
                ).index;
                this.tabPrincipal.selectedIndex = this.indexForTabPrincipal;
            });
    }

    getPath(tab: { path: string }, subTab: { path: string }) {
        return `${tab.path}/${subTab.path}`;
    }

    navigate(event: MatTabChangeEvent) {
        this.router.navigateByUrl(menuLink[event.index].path);
    }
}
