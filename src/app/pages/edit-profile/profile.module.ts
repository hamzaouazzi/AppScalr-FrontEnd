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
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EditProfileComponent } from './edit-profile.component';



const ENTRY_COMPONENTS = [

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
  ],
  declarations: [
    EditProfileComponent,

  ],
  entryComponents: [
    ...ENTRY_COMPONENTS,
  ],
})
export class ProfileModule { }
