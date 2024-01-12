import { NgModule } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { NavService } from './nav.service';
import { TopNavComponent } from './top-nav/top-nav.component';
import { MenuListItemComponent } from './menu-list-item/menu-list-item.component';

// Application Modules
import { DashboardModule } from 'src/app/dashboard/dashboard.module';
import { IdentityModule } from 'src/app/identity/identity.module';
import { HardwareModule } from 'src/app/hardware/hardware.module';
import { SystemModule } from 'src/app/system/system.module';
import { DetailModule } from 'src/app/detail/detail.module';
import { IAMModule } from 'src/app/iam/iam.module';

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    MenuListItemComponent
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,

    FlexLayoutModule,

    BrowserModule,
  	FormsModule,
	  ReactiveFormsModule,
    BrowserAnimationsModule,
	
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatTooltipModule,

    DashboardModule,
    IAMModule,
    IdentityModule,
    HardwareModule,
    SystemModule,
    DetailModule
  ],
  providers: [NavService],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
