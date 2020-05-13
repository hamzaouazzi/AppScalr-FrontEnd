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
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ThemeModule } from '../../theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { StatusCardComponent } from './status-card/status-card.component';
import { FormsModule } from '@angular/forms';
import { ProjectsComponent } from './projects/projects.component';
import { ShowcaseDialogComponent } from './projects/showcase-dialog/showcase-dialog.component';



const ENTRY_COMPONENTS = [
  ShowcaseDialogComponent,
];

@NgModule({
  imports: [
    FormsModule,
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbTabsetModule,
    NbActionsModule,
    NbRadioModule,
    NbSelectModule,
    NbStepperModule,
    NbInputModule,
    NbListModule,
    NbIconModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
    NbEvaIconsModule,
    NbButtonModule,
    NgxEchartsModule,
  ],
  declarations: [
    DashboardComponent,
    StatusCardComponent,
    ProjectsComponent,
    ShowcaseDialogComponent,

  ],
  entryComponents: [
    ...ENTRY_COMPONENTS,
  ],
})
export class DashboardModule { }
