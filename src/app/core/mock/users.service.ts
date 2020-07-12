import { of as observableOf,  Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { Contacts, RecentUsers, UserData } from '../data/users';
import { NbAuthService} from './../../auth/services/auth.service';
import {NbAuthJWTToken} from '../../auth/services/token/token';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
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

  constructor(private authService: NbAuthService,private http: HttpClient) {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

      if (token.isValid()) {
        this.publishUser(token.getPayload()); // receive payload from token and assign it to our `user` variable
      }

    });
  }
  currentUser(): Observable<any> {
    return  this.http.get(`${environment.base_url}/user`);
  }

  getUserStats(): Observable<any> {
    return  this.http.get(`${environment.base_url}/user/stats`);
  }

  getUser(id:number): Observable<any> {
    return  this.http.get(`${environment.base_url}/user/${id}`);
  }

  updateUser(value: any): Observable<Object> {
    return this.http.put(`${environment.base_url}/user/edit`, value);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${environment.base_url}/${id}`, { responseType: 'text' });
  }

  postFeeedbak(feedback:Object): Observable<any> {
    return  this.http.post(`${environment.base_url}/feedback/create`,feedback);
  }

  declareBug(bug:Object): Observable<any> {
    return  this.http.post(`${environment.base_url}/bug/create`,bug);
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
