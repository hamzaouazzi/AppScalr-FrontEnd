import { Component, OnInit, Input, ViewChild, ViewContainerRef, ComponentFactoryResolver, Type } from '@angular/core';
import { StudioService } from '../services/studio.service';
import { PropertyPageComponent } from './property-page/property-page.component';
import { PropertyButtonComponent } from './property-button/property-button.component';

@Component({
  selector: 'ng-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss'],
})
export class RightSidebarComponent implements OnInit {

  @Input() showMe: boolean;
  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

  components = [];
  draggableComponent1 = PropertyPageComponent;
  draggableComponent2 = PropertyButtonComponent;

  constructor(private studioService:StudioService,
    private componentFactoryResolver: ComponentFactoryResolver) {
    studioService.myBool$.subscribe((newBool: boolean) => { this.showMe = newBool; });
   }

  ngOnInit() {
  }

  addComponent(componentClass: Type<any>) {
    // Create component dynamically inside the ng-template
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
    const component = this.container.createComponent(componentFactory);

    // Push the component so that we can keep track of which components are created
    this.components.push(component);
  }

  removeComponent(componentClass: Type<any>) {
    // Find the component

    // tslint:disable-next-line: no-shadowed-variable
    const component = this.components.find((component) => component.instance instanceof componentClass);
    const componentIndex = this.components.indexOf(component);

    if (componentIndex !== -1) {
      // Remove component from both view and array
      this.container.remove(this.container.indexOf(component));
      this.components.splice(componentIndex, 1);
    }
  }

}
