import { NgModule } from '@angular/core';
import { DragulaModule } from 'ng2-dragula';
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
import { UiElementComponent } from './ui-element/ui-element.component';
import { SidebarLeftComponent } from './sidebar-left/sidebar-left.component';



const ENTRY_COMPONENTS = [
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
    //dragula
    DragulaModule.forRoot()
  ],
  declarations: [
    StudioComponent,
    UiElementComponent,
    SidebarLeftComponent,

  ],
  entryComponents: [
    ...ENTRY_COMPONENTS,
  ],
})
export class StudioModule { }
