 import { NgModule } from '@angular/core';
 import { ColorPickerModule } from 'ngx-color-picker';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbTabsetModule,
  NbUserModule,
  NbRadioModule,
  NbSelectModule,
  NbListModule,
  NbIconModule,
  NbDialogModule,
  NbWindowModule,
  NbStepperModule,
  NbInputModule,
  NbAccordionModule,
  NbSidebarModule,
  NbLayoutModule,
  NbCheckboxModule,
  NbSearchModule,
  NbContextMenuModule,
  NbFormFieldModule,
  NbToggleModule,
  NbTooltipModule,
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ThemeModule } from '../theme/theme.module';
import { StudioComponent } from './studio.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NbSecurityModule } from '@nebular/security';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CustomizeComponent } from './customize/customize.component';
import { PropertyPageComponent } from './right-sidebar/property-page/property-page.component';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { RightSidebarComponent } from './right-sidebar/right-sidebar.component';
import { CenterLayoutComponent } from './center-layout/center-layout.component';
import { HeaderComponent } from './header/header.component';
import { SubheaderComponent } from './subheader/subheader.component';
import { D3Service } from 'd3-ng2-service';
import { IonicModule } from '@ionic/angular';
import { PropertyButtonComponent } from './right-sidebar/property-button/property-button.component';


const ENTRY_COMPONENTS = [
  PropertyButtonComponent,
  PropertyPageComponent,
  LeftSidebarComponent,
  RightSidebarComponent,
  CenterLayoutComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ThemeModule,
    NbCardModule,
    NbSecurityModule,
    NbButtonModule,
    NbTabsetModule,
    NbActionsModule,
    NbRadioModule,
    NbSelectModule,
    NbStepperModule,
    NbInputModule,
    NbListModule,
    NbAccordionModule,
    NbIconModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
    NbEvaIconsModule,
    NbButtonModule,
    NbToggleModule,
    NbTooltipModule,
    NgxEchartsModule,
    NbSidebarModule,
    NbLayoutModule,
    NbCheckboxModule,
    NbSearchModule,
    NbUserModule,
    NbContextMenuModule,
    ThemeModule,
    NbFormFieldModule,
    DragDropModule,
    ColorPickerModule,
    NbIconModule,
    IonicModule,
  ],
  declarations: [
    StudioComponent,
    CustomizeComponent,
    PropertyPageComponent,
    LeftSidebarComponent,
    RightSidebarComponent,
    CenterLayoutComponent,
    HeaderComponent,
    SubheaderComponent,
    PropertyButtonComponent,

  ],
  providers: [D3Service],
  entryComponents: [
    ...ENTRY_COMPONENTS,
  ],
})
export class StudioModule { }
