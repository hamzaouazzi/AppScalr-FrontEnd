import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewContainerRef, OnDestroy, ChangeDetectorRef } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  CdkDrag,
  CdkDropList,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { UiElement } from '../models/UiElement.model';
import { UiCategory } from '../models/UiCategory.model';
import { StudioService } from '../services/studio.service';
import UiElementsJson from '../data/UiElements.json';
import UiCategoriesJson from '../data/UiCategories.json';
import { NgPopoverPageComponent } from './popover-page/popover-page.component';
import { DashboardService } from '../../core/mock/dashboard.service';
import { Page } from '../../core/model/Project.model';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { PageRequest } from '../../core/model/page-request.model';

@Component({
  selector: 'ng-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss'],
})
export class LeftSidebarComponent implements OnInit {

  @ViewChild('item', { static: true }) accordion;
  @Input() categories: UiCategory[];
  @Output() elementDragged: EventEmitter<UiElement>;
   // tslint:disable-next-line: no-output-rename
   @Output('cdkDragDropped') dropped: EventEmitter<CdkDragDrop<any>> = new EventEmitter<CdkDragDrop<any>>();

  element: UiElement;
  uiElementsJson:any=UiElementsJson;
  uiCategoriesJson:any=UiCategoriesJson;
  uielements:Array<UiElement>;
  pages:Page[];
  id:number;
  newPage:PageRequest = new PageRequest();
  submitted = false;
  pageid:number;


   templatePageComponent = NgPopoverPageComponent;

  constructor(private studioService: StudioService,
              private dashboardService:DashboardService,
              private route: ActivatedRoute,
              private cd:ChangeDetectorRef) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getAppPages();
    const timer = Observable.timer(2000, 5000);
    timer.subscribe(() => this.getAppPages());

    this.studioService.subscribeToUiNotifier().subscribe(uiElement => {
      this.element = uiElement;
    });


    this.uielements=<UiElement[]>this.uiElementsJson;
    this.uielements=<UiElement[]>this.uiElementsJson;
    this.categories=this.uiCategoriesJson as [];
  }


  sendPage(id:number,title:string,url:string,domPage:string) {
    this.newPage.pageid = id;
    this.newPage.pagetitle = title;
    this.newPage.routeurl = url;
    this.newPage.dom = domPage;
    console.log("Page-Clicked:",this.newPage);
    this.studioService.notifyOfPageClicked(this.newPage);


  }

  getAppPages() {
    this.dashboardService.getAppPages(this.id)
    .subscribe(data => {
      this.pages = data;
      this.cd.detectChanges()
    }, error => console.log(error));

  }

  saveCurrentElement(el: UiElement) {
    console.log('element being dragged :: ', el);
    this.elementDragged.emit(el);
  }

  drop(event: CdkDragDrop<Element[]>) {
    console.log(event.item.data)
    this.studioService.onTalkDrop(event);
}

createPage() {
  this.studioService.createPage(this.newPage,this.id)
       .subscribe(data => { console.log("New page::",data)
                            },
                           error => console.log(error));
                           this.newPage=new PageRequest();

}
onSubmit() {
  this.submitted = true;
  this.createPage();
}

trackByFn(index: number, item) {
  return item.trackId;
}



}
