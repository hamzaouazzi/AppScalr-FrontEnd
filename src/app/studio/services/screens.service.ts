import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UiCategory } from '../models/UiCategory.model';
import { CONSTANTES } from '../../core/config/constants';
import { Observable, Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ScreensService {
    constructor(private http: HttpClient) { }

    private myFunctionCallSource = new Subject();
    serviceData: string;

    myFunctionCalled$ = this.myFunctionCallSource.asObservable();


    callMyFunction() {
      this.myFunctionCallSource.next();
  }


}
