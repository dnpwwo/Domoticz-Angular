import { Component, ElementRef, Input, EventEmitter, Output, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { KeyValue } from '@angular/common';
import { environment } from '../../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Tab } from "src/app/detail/tab";
import { Tile, TilesMessage } from "src/app/detail/tile";
import { Value } from "src/app/detail/value";
import { TabService } from "src/app/detail/tab.service";
import { TileService } from "src/app/detail/tile.service";
import { ValueService } from "src/app/detail/value.service";
//import { TabTileWatcherService } from './layout-tab-watcher.service';
@Component({
  selector: 'dmz-layout-tab',
  templateUrl: './layout-tab.component.html',
  styleUrls: ['./layout-tab.component.scss']
})
export class LayoutTabComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() tab: Tab;
  @Output() output = new EventEmitter();

  numColumns: number = 0;
  colWidth: number = 0;
  rowHeight: number = 0;
  gutterSize: number = 0;
  backgroundImage: any = null;
  backgroundColour: string = null;

  gridMinWidth: string = "90px";
  gridMaxWidth: string = "180px";
  gridWidth: number = 0;

  tiles: Tile[] = [] as Array<Tile>;

  constructor(protected sanitizer: DomSanitizer,
    private tileService: TileService,
    private snackBar: MatSnackBar) { }

  @ViewChild('elementGrid', { read: ElementRef }) nativeElementGrid: ElementRef;
  @ViewChild('elementGrid') elementGrid: any;

  ngOnInit() {
    if (this.tab.Background.length > 0) {
      if ((this.tab.Background[0] == '#') || (this.tab.Background.length < 10)) {   // Handle #rrggbb and named colours
        this.backgroundColour = this.tab.Background;
      } else {                                                                      // Otherwise assume image
        if (environment.production) {
          this.backgroundImage = this.tab.Background;
        } else {
          this.backgroundImage = this.sanitizer.bypassSecurityTrustStyle(this.tab.Background);
        }
      }
    }
    this.numColumns = this.tab.MinColumns;
    this.colWidth = this.tab.MinColWidth;
    this.rowHeight = this.tab.RowHeight;
    this.gutterSize = this.tab.GutterSize;

    this.gridMinWidth = ((this.tab.MinColWidth * this.tab.MinColumns) + (this.tab.GutterSize * (this.tab.MinColumns - 1))).toString() + "px";
    this.gridMaxWidth = ((this.tab.MaxColWidth * this.tab.MaxColumns) + (this.tab.GutterSize * (this.tab.MaxColumns - 1))).toString() + "px";
    this.gridWidth = 0;

    this.numColumns = this.calcColumns(window.innerWidth - 29);
    this.colWidth = this.calcColumnWidth(window.innerWidth - 29);
  }

  ngAfterViewInit() {
    this.loadTiles();
  }

  loadTiles() {
    var queryParams: KeyValue<string, any>[] = [{ key: 'Order', value: 'DisplayOrder' }];
    this.tileService.getTiles(this.tab.TabID, queryParams).subscribe((TilesMsg: TilesMessage) => {
      if (TilesMsg != null) {
        TilesMsg.Tiles.forEach(tileObj => {
          this.tiles.push(tileObj);
        });
      }
      else this.snackBar.open("No Tiles returned for Tab '"+this.tab.Name+"'.", '', { duration: 5000 });
    }, (error) => {
      this.snackBar.open(error.statusText, '', { duration: 10000 });
    })
  }

  onResize(event) {
    var usableWidth = (this.nativeElementGrid.nativeElement.clientWidth > 0)
      ? this.nativeElementGrid.nativeElement.clientWidth
      : (event.currentTarget.innerWidth - 29);
    this.numColumns = this.calcColumns(usableWidth);
    this.colWidth = this.calcColumnWidth(usableWidth);
  }

  ngOnDestroy(): void {
  }

  calcColumns(gridWidth: number): number {
    if (gridWidth == 0) {
      debugger;
    }
    var numCols = (gridWidth / this.tab.MinColWidth);
    if (numCols < this.tab.MinColumns) numCols = this.tab.MinColumns;
    if (numCols > this.tab.MaxColumns) numCols = this.tab.MaxColumns;
    return parseInt(numCols.toString());

    //this decides how tiles are laid out, inherit it and make my own?????
    //https://github.com/angular/components/blob/master/src/material/grid-list/tile-coordinator.ts
  }

  calcColumnWidth(gridWidth: number): number {
    this.gridWidth = gridWidth;
    var columns: number = this.numColumns;  // this.elementGrid.cols;
    var gutters: number = (typeof (this.elementGrid) == 'undefined') ? 5 : parseFloat(this.elementGrid.gutterSize) * (columns - 1);
    var width: number = gridWidth - gutters;
    return (width < 0) ? 0 : parseInt((width / columns).toFixed(0));
  }
}
