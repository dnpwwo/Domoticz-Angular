import { Component, ViewContainerRef, ComponentFactoryResolver, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { KeyValue } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LayoutService } from "src/app/detail/layout.service";
import { Layout, LayoutsMessage } from "src/app/detail/layout";
import { TabService } from "src/app/detail/tab.service";
import { Tab, TabsMessage } from "src/app/detail/tab";
import { TabListWatcherService } from 'src/app/detail/tab-list/tab-list-watcher.service';

@Component({
  selector: 'dmz-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  @ViewChild("tabContainer", { read: ViewContainerRef }) tabContainer;

  layout: Layout;
  tabs: Tab[] = [] as Array<Tab>;
  selectedTab: number = 0;
  tabSocketSubscriber: any;
  isActive: boolean = false;

  constructor(private layoutService: LayoutService,
              private tabService: TabService,
              private snackBar: MatSnackBar) { }

  ngAfterViewInit() {
    this.loadLayout();
    this.tabSocketSubscriber = this.subscribe();
    this.isActive = true;
  }

  ngOnDestroy() {
    this.isActive = false;
    if (typeof (this.tabSocketSubscriber) != "undefined") {
      this.tabSocketSubscriber.unsubscribe();
    }
  }

  loadLayout() {
    var queryParams: KeyValue<string,any>[] = [{key:'Active', value: true}];
    this.layoutService.getLayouts(queryParams).subscribe((LayoutsMsg: LayoutsMessage) => {
      if (LayoutsMsg != null) {
        // Put logic here to decide which layout to use
        //var preferredLayout = this.route.snapshot.queryParamMap.get('name');
        //if (preferredLayout != null) {
        //
        //} else {
          this.layout = LayoutsMsg.Layouts[0];
        //}

        if (this.layout != null) {
          this.loadTabs();
        }
      }
      else this.snackBar.open('No Layouts returned. ', '', { duration: 5000 });
    }, (error) => {
      this.snackBar.open(error.statusText, '', { duration: 10000 });
    })
  }

  loadTabs() {
    var queryParams: KeyValue<string, any>[] = [{ key: 'Order', value: 'DisplayOrder' }];
    this.tabService.getTabs(this.layout.LayoutID, queryParams).subscribe((TabsMsg: TabsMessage) => {
      if (TabsMsg != null) {
        TabsMsg.Tabs.forEach(tabObj => {
          this.tabs.push(tabObj);
        });
      }
      else this.snackBar.open('No Tabs returned. ', '', { duration: 5000 });
    }, (error) => {
      this.snackBar.open(error.statusText, '', { duration: 10000 });
    })
  }

  tabChanged(event) {
    this.selectedTab = event.index;
    console.log("Selected tab changed to: " + this.selectedTab.toString());
  }

  getTabItems(): Tab[] {
    if (typeof (this.tabs) == "undefined") {
      return [];
    }
    return this.tabs;
  }

  getItemCount(): number {
    if (typeof (this.tabs) == "undefined") {
      return 0;
    }
    return this.tabs.length;
  }

  subscribe() {
    return new TabListWatcherService(
      () => console.log("Tabs Websocket connected."),
      () => this.getTabItems(),
      () => {
        console.log("Tabs Websocket disconnected."),
          this.unsubscribe();
      })
      .subscribe(
        (values: Tab[], reason: string) => {
          if (typeof (this.tabs) != "undefined") {
            this.tabs = values;
          }
          if (reason != "") {
            this.snackBar.open(reason, '', { duration: 3000 });
          }
        },
        Error => {
          if (typeof (Error.type) == "undefined") {
            this.snackBar.open("Domoticz error '" + Error.message + "'.", 'Retry').onAction().subscribe(() => { this.ngAfterViewInit(); });
          }
          else {
            if (Error.type != 'close') {
              console.log("WebSocket error:" + Error.type);
              this.snackBar.open("Domoticz error '" + Error.type + "'.", 'Retry').onAction().subscribe(() => { this.ngAfterViewInit(); });
            } else {
              this.snackBar.open("Domoticz terminated the connection.", 'Retry').onAction().subscribe(() => { this.ngAfterViewInit(); });
            }
          }
        });
  }

  unsubscribe() {
    if (typeof (this.tabSocketSubscriber) != "undefined") {
      this.tabSocketSubscriber.unsubscribe();
      if (this.isActive) {
        this.snackBar.open("Tab List socket has disconnected.", 'Retry').onAction().subscribe(() => { this.ngAfterViewInit(); });
      }
    }
  }
}
