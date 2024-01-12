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

// System
import { PreferenceComponent } from 'src/app/system/preference/preference.component';
import { PreferenceListComponent } from 'src/app/system/preference-list/preference-list.component';
import { UnitComponent } from 'src/app/system/unit/unit.component';
import { UnitListComponent } from 'src/app/system/unit-list/unit-list.component';
import { StandardScriptComponent } from 'src/app/system/standard-script/standard-script.component';
import { StandardScriptListComponent } from 'src/app/system/standard-script-list/standard-script-list.component';
import { TimerPlanComponent } from 'src/app/system/timer-plan/timer-plan.component';
import { TimerPlanListComponent } from 'src/app/system/timer-plan-list/timer-plan-list.component';
import { SceneComponent } from 'src/app/system/scene/scene.component';
import { SceneListComponent } from 'src/app/system/scene-list/scene-list.component';
import { SceneValueComponent } from 'src/app/system/scene-value/scene-value.component';
import { SceneValueListComponent } from 'src/app/system/scene-value-list/scene-value-list.component';

import { ConfirmationDialogComponent } from 'src/app/system/confirmation-dialog/confirmation-dialog.component';
import { FilterDialogComponent } from 'src/app/system/filter-dialog/filter-dialog.component';

import { SystemRoutingModule } from 'src/app/system/system-routing.module';

@NgModule({
  declarations: [
    StandardScriptComponent,
    StandardScriptListComponent,
    SceneComponent,
    SceneListComponent,
    SceneValueComponent,
    SceneValueListComponent,
    PreferenceComponent,
    PreferenceListComponent,
    TimerPlanComponent,
    TimerPlanListComponent,
    UnitComponent,
    UnitListComponent,

    ConfirmationDialogComponent,
    FilterDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
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

    SystemRoutingModule
  ] //,
  //entryComponents: [
  //  ConfirmationDialogComponent,
  //  FilterDialogComponent
  //]
})
export class SystemModule { }
