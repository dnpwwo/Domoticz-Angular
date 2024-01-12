import { Component, OnInit, Input } from '@angular/core';
import { Tile } from "src/app/detail/tile";

@Component({
  selector: 'dmz-tab-tile',
  templateUrl: './tab-tile.component.html',
  styleUrls: ['./tab-tile.component.css']
})
export class TabTileComponent implements OnInit {
  @Input() tile: Tile;

//  tileHeight: number = this.tile.RowSpan

  constructor() { }

  ngOnInit(): void {
  }

}
