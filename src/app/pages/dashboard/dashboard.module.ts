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
import { IonicModule } from '@ionic/angular';
import { ChangelogsComponent } from './changlogs/changelogs.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SmartTableService } from '../../core/mock/smart-table.service';
import { EditProjectComponent } from './projects/edit-project/edit-project.component';



const ENTRY_COMPONENTS = [
  ShowcaseDialogComponent,
  ChangelogsComponent
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
    IonicModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    DashboardComponent,
    StatusCardComponent,
    ProjectsComponent,
    ShowcaseDialogComponent,
    ChangelogsComponent,
    EditProjectComponent,

  ],
  entryComponents: [
    ...ENTRY_COMPONENTS,
  ],
  //providers : [SmartTableService],
})
export class DashboardModule { }
