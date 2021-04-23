import { Component, ViewChild, ElementRef, AfterViewInit, Inject } from '@angular/core';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RootStoreState } from 'app/root-store';
import { filter, take } from 'rxjs/operators';
import { selectAllRoute } from '../../../root-store/route/route-selector';
import { routes } from '@core/data/route-data';
import { menuLink } from '@shared/menu/menuLink';
import { Route } from '@core/models/route';
import * as Hammer from 'hammerjs';
import { debounce } from '@core/utility/utility';
import { DOCUMENT } from '@angular/common';
@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements AfterViewInit {
    routes$ = this.store.select(selectAllRoute);
    indexForTabPrincipal = 0;
    @ViewChild('tabPrincipal')
    tabPrincipal: MatTabGroup;
    constructor(
        private router: Router,
        private store: Store<RootStoreState.State>,
        @Inject(DOCUMENT) private document: Document,
    ) {
        this.router.events
            .pipe(
                filter((e) => e instanceof NavigationEnd),
                take(1),
            )
            .subscribe((navEnd: NavigationEnd) => {
                this.indexForTabPrincipal = [...Object.values(routes)].find(
                    (r) => r.path == navEnd.urlAfterRedirects.split('/')[1],
                ).index;
                this.tabPrincipal.selectedIndex = this.indexForTabPrincipal;
            });
    }

    ngAfterViewInit() {
        const hammertime = new Hammer(this.document.body);
        hammertime.get('swipe').set({ velocity: 0.1 });
        hammertime.on(
            'swiperight',
            debounce(() => this.switchTab(false), 100),
        );
        hammertime.on(
            'swipeleft',
            debounce(() => this.switchTab(true), 100),
        );
    }

    switchTab(isLeft: boolean) {
        const currentIndex = this.tabPrincipal.selectedIndex;
        let nextIndex = 0;
        if (isLeft) {
            nextIndex = currentIndex == this.tabPrincipal._allTabs.length - 1 ? 0 : currentIndex + 1;
        } else {
            nextIndex = currentIndex == 0 ? this.tabPrincipal._allTabs.length - 1 : currentIndex - 1;
        }
        this.tabPrincipal.selectedIndex = nextIndex;
    }
    activeSubpath(tab: Route) {
        return tab.subPath.filter((r) => r.isActive);
    }
    getPath(tab: { path: string }, subTab: { path: string }) {
        return `${tab.path}/${subTab.path}`;
    }

    navigate(event: MatTabChangeEvent) {
        this.router.navigateByUrl(menuLink[event.index].path);
    }

    trackByFunctionMainTab(index: number, tab: Route) {
        return tab;
    }

    trackByFunctionSubTab(index: number, subTab: Route) {
        return subTab;
    }
}
