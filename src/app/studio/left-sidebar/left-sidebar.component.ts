import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewContainerRef, OnDestroy } from '@angular/core';
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

   templatePageComponent = NgPopoverPageComponent;

  constructor(private studioService: StudioService) { }

  ngOnInit() {
    this.studioService.subscribeToUiNotifier().subscribe(uiElement => {
      this.element = uiElement;
    });

    this.uielements=<UiElement[]>this.uiElementsJson;
    this.uielements=<UiElement[]>this.uiElementsJson;
    this.categories=this.uiCategoriesJson as [];
    console.log("uielements",this.uielements);
    console.log("categories",this.categories);
  }


  defaultAnswers = [];

  answers = [];

  saveCurrentElement(el: UiElement) {
    console.log('element being dragged :: ', el);
    this.elementDragged.emit(el);
  }

  drop(event: CdkDragDrop<Element[]>) {
    console.log('hello world')
    console.log(event.item.data)
    this.studioService.onTalkDrop(event);
}



}
