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

// Hardware
import { InterfaceComponent } from 'src/app/hardware/interface/interface.component';
import { InterfaceListComponent } from 'src/app/hardware/interface-list/interface-list.component';
import { InterfaceLogListComponent } from 'src/app/hardware/interface-log-list/interface-log-list.component';
import { DeviceComponent } from 'src/app/hardware/device/device.component';
import { DeviceListComponent } from 'src/app/hardware/device-list/device-list.component';
import { DeviceLogListComponent } from 'src/app/hardware/device-log-list/device-log-list.component';
import { ValueListComponent } from 'src/app/hardware/value-list/value-list.component';
import { ValueTimerComponent } from 'src/app/hardware/value-timer/value-timer.component';
import { ValueTimerListComponent } from 'src/app/hardware/value-timer-list/value-timer-list.component';

import { FilterDialogComponent } from 'src/app/system/filter-dialog/filter-dialog.component';

import { HardwareRoutingModule } from 'src/app/hardware/hardware-routing.module';

@NgModule({
  declarations: [
    InterfaceComponent,
    InterfaceListComponent,
    DeviceComponent,
    DeviceListComponent,
    InterfaceLogListComponent,
    DeviceLogListComponent,
    ValueListComponent,
    ValueTimerComponent,
    ValueTimerListComponent
  ],
  imports: [
    CommonModule,

    BrowserModule,
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

    HardwareRoutingModule,

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
export class HardwareModule { }
