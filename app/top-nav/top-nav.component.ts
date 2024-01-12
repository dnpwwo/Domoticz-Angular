import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { NavService } from '../nav.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit, OnDestroy {

  AppName: string;
  @Output() theme = new EventEmitter<number>();
  theTime = new Date();
  intervalId;
  constructor(public navService: NavService) {
    console.log(environment.APP_NAME);
  }

  ngOnInit() {
    this.AppName = environment.APP_NAME;

    this.intervalId = setInterval(() => {
      this.theTime = new Date();
    }, 1000);
  }

ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  useAlternateTheme: number = 0;
  themeToggle(event: number) {
    this.useAlternateTheme++;
    if (this.useAlternateTheme == 5) {
      this.useAlternateTheme = 0;
    }
    this.theme.emit(this.useAlternateTheme);
  }
}
