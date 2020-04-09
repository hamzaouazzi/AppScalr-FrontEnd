import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { OAuth2CallbackComponent } from './oauth2-callback.component';
import { OAuth2LoginComponent } from './oauth2-login.component';

const routes: Route[] = [
  {
    path: 'oauth2/',
    component: OAuth2LoginComponent,
  },
  {
    path: 'oauth2/callback',
    component: OAuth2CallbackComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class Oauth2RoutingModule {}
