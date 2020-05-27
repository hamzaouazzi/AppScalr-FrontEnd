import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UiCategory } from '../models/UiCategory.model';
import { UiElement } from '../models/UiElement.model';
import { StudioService } from '../services/studio.service';

@Component({
  selector: 'sidebar-left',
  templateUrl: './sidebar-left.component.html',
  styleUrls: ['./sidebar-left.component.css']
})
export class SidebarLeftComponent implements OnInit {


  @Input() categories: UiCategory[];
  @Output() elementDragged: EventEmitter<UiElement>;




  constructor(private studio: StudioService) { }

  ngOnInit(): void {
  }


  saveCurrentElement(el: UiElement){
    console.log('element being dragged :: ', el);
    this.elementDragged.emit(el);
  }


  // right sidebar
  element: UiElement;
  ngOnInit(){
    this.studio.subscribeToUiNotifier().subscribe(uiElement=>{
      this.element = uiElement;
    })
  }
}
