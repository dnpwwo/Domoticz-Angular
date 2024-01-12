import { Component, ViewChild, ElementRef, ViewEncapsulation, AfterViewInit, HostBinding } from '@angular/core';
import { trigger, transition, animate, style, keyframes } from '@angular/animations';
import { Location } from '@angular/common';
import { NavItem } from './nav-item';
import { NavService } from './nav.service';
import { VERSION } from '@angular/core';
import { MatSidenavContent } from '@angular/material/sidenav';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'dmz-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('slideVertical', [
      transition(':enter', [
        style({ transform: 'translateY(100%)' }),
        animate(300,
          keyframes([
            style({ opacity: 0, transform: 'translateY(100%)', offset: 0 }),
            style({ opacity: 0.5, transform: 'translateY(-5px)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 })
          ])
      )]),
      transition(':leave', [
        animate(300,
          keyframes([
            style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
            style({ opacity: 0.7, transform: 'translateY(-5px)', offset: 0.7 }),
            style({ opacity: 0, transform: 'translateY(100%)', offset: 1.0 })
          ]))
      ])
    ]),
    trigger('slideHorizontal', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate(300,
          keyframes([
            style({ opacity: 0, transform: 'translateX(100%)', offset: 0 }),
            style({ opacity: 0.5, transform: 'translateX(-5px)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
          ])
        )
      ]),
      transition(':leave', [
        animate(300,
          keyframes([
            style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
            style({ opacity: 0.7, transform: 'translateX(-5px)', offset: 0.7 }),
            style({ opacity: 0, transform: 'translateX(100%)', offset: 1.0 })
        ]))
      ])
    ])
  ]})
export class AppComponent implements AfterViewInit {
  @ViewChild('appDrawer') appDrawer: ElementRef;
  @ViewChild('appContent') appContent: MatSidenavContent;

  AlternateThemes = ['', 'purple-theme', 'deep-purple-theme', 'pink-theme', 'yellow-theme' ];
  @HostBinding('class') useAlternateTheme: string = '';

  version = VERSION;
  side = '';

  navItems: NavItem[] = [
    {
      displayName: 'Dashboard',
      iconName: '',
      route: '/',
    },
    {
      displayName: 'Maintenance',
      disabled: true,
      iconName: '',
      children: [
        {
          displayName: 'Layouts',
          iconName: '',
          route: '/Layouts'
        },
        {
          displayName: 'Roles',
          iconName: '',
          route: '/Roles'
        },
        {
          displayName: 'Users',
          iconName: '',
          route: '/Users'
        },
        {
          displayName: 'Interfaces',
          iconName: '',
          route: '/Interfaces'
        },
        {
          displayName: 'Units',
          iconName: '',
          route: '/Units'
        }
      ]
    },
    {
      displayName: 'System',
      disabled: true,
      iconName: '',
      children: [
        {
          displayName: 'Scenes',
          iconName: '',
          route: '/Scenes'
        },
        {
          displayName: 'Standard Scripts',
          iconName: '',
          route: '/StandardScripts'
        },
        {
          displayName: 'Timer Plans',
          iconName: '',
          route: '/TimerPlans'
        },
        {
          displayName: 'Preferences',
          iconName: '',
          route: '/Preferences'
        }
      ]
    }
  ];

  constructor(private location: Location,
              private navService: NavService,
              private overlayContainer: OverlayContainer) { }

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }

  showNavButtons: boolean = false;
  onScroll(event) {
    this.showNavButtons = (this.appContent.measureScrollOffset("top") > 50);
  }

  scrollToTop() {
    this.appContent.scrollTo({ top: 0, behavior: 'smooth'});
  }

  goBack() {
    this.location.back();
    console.log('goBack()...');
  }

  onTheme(event: number) {
    // Undo previous dialog theme if one was set
    if (this.useAlternateTheme != '') {
      this.overlayContainer.getContainerElement().classList.remove(this.useAlternateTheme);
    }
    // Theme everything under dmz-root (via HostBinding)
    this.useAlternateTheme = this.AlternateThemes[event];
    // Theme dialogs
    if (this.useAlternateTheme != '') {
      this.overlayContainer.getContainerElement().classList.add(this.useAlternateTheme);
    }
  }
}
