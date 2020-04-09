import { of as observableOf,  Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { Contacts, RecentUsers, UserData } from '../data/users';
import { NbAuthService} from './../../auth/services/auth.service';
import {NbAuthJWTToken} from '../../auth/services/token/token';
// import { NbAuthAzureToken } from '../core.module';
@Injectable()
export class UserService {
  // user: any;
  protected user$: BehaviorSubject<any> = new BehaviorSubject(null);
  private publishUser(user: any) {
    this.user$.next(user);
 }
 onUserChange(): Observable<any> {
  return this.user$;
}

  constructor(private authService: NbAuthService) {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

      if (token.isValid()) {
        this.publishUser(token.getPayload()); // receive payload from token and assign it to our `user` variable
      }

    });
  }

  /* getUser(): Observable<any> {
    return of(this.user);
  } */


 /*  getUsers(): Observable<any> {
    return observableOf(this.users);
  }

  getContacts(): Observable<Contacts[]> {
    return observableOf(this.contacts);
  }

  getRecentUsers(): Observable<RecentUsers[]> {
    return observableOf(this.recentUsers);
  } */
}
