import {EventEmitter, Injectable} from '@angular/core';
import {Event, NavigationEnd, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class NavService {
  public appDrawer: any;
  public currentUrl = new BehaviorSubject<string>(undefined);

  isOpen: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);
      }
    });
  }

  public closeNav() {
    this.isOpen = false;
    this.appDrawer.close();
  }

  public toggleNav() {
    if (!this.isOpen) {
      this.openNav();
    }
    else {
      this.closeNav();
    }
  }

  public openNav() {
    this.isOpen = true;
    this.appDrawer.open();
  }
}
