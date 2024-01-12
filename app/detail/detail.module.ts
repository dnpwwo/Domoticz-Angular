import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';

import { AceModule, AceConfigInterface, ACE_CONFIG } from 'ngx-ace-wrapper';
const DEFAULT_ACE_CONFIG: AceConfigInterface = { tabSize: 4 };

// Detail
import { ValueComponent } from 'src/app/detail/value/value.component';
import { ValueLogComponent } from 'src/app/detail/value-log/value-log.component';
import { ValueLogListComponent } from 'src/app/detail/value-log-list/value-log-list.component';
import { ValueHistoryListComponent } from 'src/app/detail/value-history-list/value-history-list.component';
import { LayoutComponent } from 'src/app/detail/layout/layout.component';
import { LayoutListComponent } from 'src/app/detail/layout-list/layout-list.component';
import { TabComponent } from 'src/app/detail/tab/tab.component';
import { TabListComponent } from 'src/app/detail/tab-list/tab-list.component';
import { ElementComponent } from 'src/app/detail/element/element.component';
import { ElementListComponent } from 'src/app/detail/element-list/element-list.component';

import { FilterDialogComponent } from 'src/app/system/filter-dialog/filter-dialog.component';

import { DetailRoutingModule } from 'src/app/detail/detail-routing.module';
import { TileListComponent } from './tile-list/tile-list.component';
import { TileComponent } from './tile/tile.component';

@NgModule({
  declarations: [
    ValueComponent,
    ValueLogComponent,
    ValueLogListComponent,
    ValueHistoryListComponent,
    LayoutComponent,
    LayoutListComponent,
    TabComponent,
    TabListComponent,
    ElementComponent,
    ElementListComponent,
    TileListComponent,
    TileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,

    DetailRoutingModule,

    AceModule
  ],
  //entryComponents: [
  //  FilterDialogComponent
  //],
  providers: [
    {
      provide: ACE_CONFIG,
      useValue: DEFAULT_ACE_CONFIG
    }
  ]
})
export class DetailModule { }
