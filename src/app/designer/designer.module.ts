import { NgModule } from '@angular/core';
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
  NbStepComponent,
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
import { DesignerComponent } from './designer.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NbSecurityModule } from '@nebular/security';
import { DragDropModule } from '@angular/cdk/drag-drop';



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
  ],
  declarations: [
    DesignerComponent,

  ],
  entryComponents: [
    ...ENTRY_COMPONENTS,
  ],
})
export class DesignerModule { }
