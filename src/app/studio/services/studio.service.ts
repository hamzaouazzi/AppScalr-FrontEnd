import { Injectable, Input, ElementRef } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject, Observable } from "rxjs";
import { UiElement } from "../models/UiElement.model";
import {
  CdkDragDrop,
  moveItemInArray,
  CdkDrag,
  CdkDropList,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import { cloneDeep } from "lodash";
import { environment } from '../../../environments/environment';
import { Page } from '../../core/model/Project.model';
import { PageRequest } from '../../core/model/page-request.model';

@Injectable({ providedIn: "root" })
export class StudioService {
  @Input() elements: UiElement[];
  uiNotifier$ = new Subject<UiElement>();
  answers: UiElement[] = [];

  //right sidebar-show
  myBool$: Observable<boolean>;
  private boolSubject = new Subject<boolean>();
  idSubject$ = new Subject<any>();

  pageNotifier$ = new Subject<PageRequest>();

  constructor(private httpClient: HttpClient) {
    this.myBool$ = this.boolSubject.asObservable();
  }
  setID(value: number) {
    console.log("service -:id:",value)
    this.idSubject$.next(value);
  }

  getID() : Observable<any> {
    return this.idSubject$.asObservable();
  }


  setRunning = (value: boolean) => {
    this.boolSubject.next(value);
  };

  set myBool(newValue) {
    this.myBool$ = newValue;
    this.boolSubject.next(newValue);
  }
  notifyOfPageDeleted(page:PageRequest) {
    this.pageNotifier$.next(page);
  }

  notifyOfPageClicked(page: PageRequest) {
    console.log("Page here::",page);
    this.pageNotifier$.next(page);
  }

  subscribeToPage() {
    return this.pageNotifier$.asObservable();
  }

  createPage(page:Object,id:number): Observable<any> {
    return  this.httpClient.post(`${environment.base_url}/app/${id}/page/create`,page);
  }



  updatePage(page:Object,idpage:number,idapp:number): Observable<any> {
    return  this.httpClient.put(`${environment.base_url}/app/${idapp}/page/${idpage}/save`,page);
  }

  deletePage(idpage: number,idapp:number): Observable<any> {
    return this.httpClient.delete(`${environment.base_url}/app/${idapp}/page/${idpage}/delete`);
  }



  // observer
  notifyComponentsOfElementDrag(el: UiElement) {
    this.uiNotifier$.next(el);
  }

  // observable
  subscribeToUiNotifier() {
    return this.uiNotifier$.asObservable();
  }

  createCopy(origin) {
    return JSON.parse(JSON.stringify(origin));
  }

  /* method n°1 */
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      const answerCopy = this.createCopy(this.answers[event.currentIndex]);
      this.answers[event.currentIndex] = answerCopy;
      console.log(answerCopy);
    }
  }

  /* method n°2 */
  onTalkDrop(event: CdkDragDrop<Element[]>) {
    console.log(event);
    if (event.previousContainer !== event.container) {
      // Clone the item that was dropped.
      const clone = cloneDeep(
        event.previousContainer.data[event.previousIndex]
      );
      // Add the clone to the new array.
      event.container.data.splice(event.currentIndex, 0, clone);
    } else {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  /*** DETECT AND NOTIFY WHEN ELEMENT OF CENTER LAYOUT IS CHANGED
   * Detects change and notify right sidebar of the element passing all its data for display and change
  ***/

  elementClickedNotifier$ = new Subject<UiElement>();
  elementChangedNotifier$ = new Subject<UiElement>();
  elementSelectedNotifier$ = new Subject<UiElement>();

  domSavedNotifier$ = new Subject<string>();


  domSavedNotify() {
    return this.domSavedNotifier$.asObservable();
  }

  elementClickedNotify() {
     return this.elementClickedNotifier$.asObservable();
   }

   elementChangeNotify() {
    return this.elementChangedNotifier$.asObservable();
   }
   elementSelectedNotify() {
    return this.elementSelectedNotifier$.asObservable();
   }

   notifyOfDomSaved(dom:string) {
     console.log('Dom saved',dom);
     this.domSavedNotifier$.next(dom);

   }

   notifyOfElementClicked(el: UiElement) {
     console.log('subject fired', el)
     this.elementClickedNotifier$.next(el);
   }

   notifyOfElementChanged(el: UiElement) {
    console.log('subject fired', el)
    this.elementChangedNotifier$.next(el);
  }

  notifyOfElementSelected(el: UiElement) {
    console.log('subject Selected', el)
    this.elementSelectedNotifier$.next(el);
  }



}
