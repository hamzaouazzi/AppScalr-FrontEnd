import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { UiElement } from '../models/UiElement.model';

@Injectable({providedIn: 'root'})
export class StudioService {

    uiNotifier$ = new Subject<UiElement>();

    constructor(private httpClient: HttpClient) { }
    //everythng that has to do withs tudio

    //observer
    notifyComponentsOfElementDrag(el: UiElement){
        this.uiNotifier$.next(el);
    }

    //observable
    subscribeToUiNotifier(){
        return this.uiNotifier$.asObservable();
    }







}