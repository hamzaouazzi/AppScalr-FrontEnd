import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';
import { NbIconModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ThemeModule } from '../theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { IonicModule } from '@ionic/angular';


@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    NbIconModule,
    NbEvaIconsModule,
    MiscellaneousModule,
    IonicModule
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
