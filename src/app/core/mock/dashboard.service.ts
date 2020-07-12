import { of as observableOf,  Observable, BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { NbAuthService} from '../../auth/services/auth.service';
import {NbAuthJWTToken} from '../../auth/services/token/token';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
// import { NbAuthAzureToken } from '../core.module';
@Injectable()
export class DashboardService {

   appid$: Observable<number>;
   idSubject$ = new Subject<number>();
  protected user$: BehaviorSubject<any> = new BehaviorSubject(null);

  appClickedNotify() {
    return this.idSubject$.asObservable();
  }
  setID(value: number) {
    console.log("service -:id:",value)
    this.idSubject$.next(value);
  }



  private publishUser(user: any) {
    this.user$.next(user);
 }
 onUserChange(): Observable<any> {
  return this.user$;
}

  constructor(private authService: NbAuthService,private http: HttpClient) {

  }

  getTemplates(): Observable<any> {
    return  this.http.get(`${environment.base_url}/templates`);
  }

  getApp(id: number): Observable<any> {
    return  this.http.get(`${environment.base_url}/app/${id}`);
  }

  getApps(): Observable<any> {
    return  this.http.get(`${environment.base_url}/app`);
  }

  getAppPages(id: number): Observable<any> {
    return  this.http.get(`${environment.base_url}/app/${id}/page`);
  }


  getUserLogs(): Observable<any> {
    return  this.http.get(`${environment.base_url}/userlog`);
  }

  createApp(app:Object): Observable<any> {
    return  this.http.post(`${environment.base_url}/app/create`,app);
  }

  editApp(id: number,value: any): Observable<Object> {
    return this.http.put(`${environment.base_url}/app/${id}/edit`, value);
  }

  deleteApp(id: number): Observable<any> {
    console.log("Service here : id=",id)
    return this.http.delete(`${environment.base_url}/app/${id}/delete`);
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
