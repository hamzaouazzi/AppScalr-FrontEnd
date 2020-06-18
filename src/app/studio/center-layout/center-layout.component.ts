import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  AfterViewInit,
  ElementRef,
  Input,
  Output,
  Renderer2
} from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { ColorPickerService, Cmyk } from "ngx-color-picker";
import {
  CdkDragDrop,
  moveItemInArray,
  CdkDrag,
  CdkDropList,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import zoom from "./data/zoom.json";
import { ScreensService } from "../services/screens.service";
import { PropertyPageComponent } from "../right-sidebar/property-page/property-page.component";
import { D3Service, D3, Selection } from "d3-ng2-service";
import { UiCategory } from "../models/UiCategory.model";
import { UiElement } from "../models/UiElement.model";
import { StudioService } from "../services/studio.service";


@Component({
  selector: "ng-center-layout",
  templateUrl: "./center-layout.component.html",
  styleUrls: ["./center-layout.component.scss"]
})
export class CenterLayoutComponent implements OnInit, AfterViewInit {
  @ViewChild("framecontainer", { static: false }) frame;
  @ViewChild("listDrop", { static: false }) element: ElementRef;
  @ViewChild("ColorPicker", { static: false }) ColorPicker;
  @ViewChild("sel", { static: false }) select;
  @ViewChild("ios", { static: false }) ioshead;
  @ViewChild("android", { static: false }) androidhead;
  @ViewChild("zoomin", { static: false }) zoomin;
  @ViewChild("zoomout", { static: false }) zoomout;
  @ViewChild(PropertyPageComponent) page: PropertyPageComponent;
  @ViewChild("reorder", { static: false }) reorderGroup;
  @Input() categories: UiCategory[];
  @Input() elements: UiElement[];
  @Input() id: string;

  private d3: D3;
  showVar: boolean = false;

  answers: UiElement[] = [];

  public selectedColor: string = "color1";
  public color1: string = "#fff";
  optionSelected;
  valueSelected;
  $scope;
  received: string;

  //observe DOM changes
  observer: MutationObserver;

  constructor(
    private screenService: ScreensService,
    private cpService: ColorPickerService,
    private studioService: StudioService,
    private d3Service: D3Service,
    private renderer: Renderer2,
    private center: ElementRef
  ) {
    this.d3 = d3Service.getD3(); // <-- obtain the d3 object from the D3 Service
    studioService.myBool$.subscribe((newBool: boolean) => {
      this.showVar = newBool;
    });
    /* this.screenService.myFunctionCalled$.subscribe(
      res => console.log("property elm",this.page),
      err => console.log('MyService error', err)
  );
 */
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterContentChecked() {
    console.log("SOMETHING");
  }
  ngAfterViewInit() {
    /* if (this.element) {
      console.log("Drop list", this.element);
      console.log("picker", this.ColorPicker);
      // console.log("seleect", this.selectedValue);
    } else {
      console.log("Droplist Not found !!", this.element);
    } */

    // const elementsList = this.element;
    // const renderer = this.renderer;
    // const deletectClickFunc = this.__detectClick.bind(this);

    // this.observer = new MutationObserver(mutations => {
    //   mutations.forEach(function(mutation) {
    //     console.log(mutation.type);

    //     let listItems = Array.from(
    //       elementsList.nativeElement.querySelectorAll('*[id^="item"]')
    //     );

    //     listItems.forEach((listItem, j) => {
    //       renderer.listen(listItem, "click", evt => {
    //         console.log("element clicked", listItem);
    //         deletectClickFunc(listItem);
    //       });
    //     });
    //   });
    // });
    // let config = { attributes: true, childList: true, characterData: true };
    // this.observer.observe(this.element.nativeElement, config);
  }





  ngOnInit() {
    this.__subscribeToElementChange();
    this.__removeElementSelected();
  }

  replace1() {
    this.d3.select(this.ioshead.nativeElement).style("opacity", 1);
    this.d3.select(this.androidhead.nativeElement).style("opacity", 0);
  }

  replace2() {
    this.d3.select(this.androidhead.nativeElement).style("opacity", 1);
    this.d3.select(this.ioshead.nativeElement).style("opacity", 0);
  }

  getMessage(event) {
    this.received = event.color;
  }

  changeColor(event) {
    this.element.nativeElement.style.backgroundColor = event.color;
  }

  selectedValue: number=1;

  zoomArray = zoom;
  zoomArr = [0.5, 0.75, 0.9, 1];

  indexofArr = 4;


  handleChange() {
    console.log("this is handle change method !");
    console.log("element", this.frame);
    const val: number = this.selectedValue;
    console.log("handle change selected value ", val);
    this.indexofArr = this.zoomArr.indexOf(val);
    console.log("Handle changes", this.indexofArr);
    this.frame.nativeElement.style["transform"] = `scale(${val})`;
  }


  public cmykValue: string = "";

  public cmykColor: Cmyk = new Cmyk(0, 0, 0, 0);
  public onEventLog(event: string, data: any): void {
    console.log(event, data);
  }

  public onChangeColor(color: string): void {
    console.log("Color changed:", color);
  }

  public onChangeColorCmyk(color: string): Cmyk {
    const hsva = this.cpService.stringToHsva(color);

    if (hsva) {
      const rgba = this.cpService.hsvaToRgba(hsva);

      return this.cpService.rgbaToCmyk(rgba);
    }

    return new Cmyk(0, 0, 0, 0);
  }

  public onChangeColorHex8(color: string): string {
    const hsva = this.cpService.stringToHsva(color, true);

    if (hsva) {
      return this.cpService.outputFormat(hsva, "rgba", null);
    }

    return "";
  }

  /***********************************************************
   * * HANDLE DROP EVENT FROM LEFT SIDEBAR INTO CENTER LAYOUT
   ***********************************************************
   */

   DOM_ID_INCREMENTER = 0;

  drop(event: CdkDragDrop<Element[]>) {

    const currentElement: UiElement = event.item.data;
    console.log("how u do :::: ", currentElement);
    const el = this.renderer.createElement(currentElement.type);

    if (currentElement.classes && currentElement.classes.length > 0) {
      for (const _class of currentElement.classes) {
        this.renderer.addClass(el, _class);
      }
    }

    if (currentElement.attributes && currentElement.attributes.length > 0) {
      for (const _attr of currentElement.attributes) {
        console.log(_attr);
        this.renderer.setAttribute(el, _attr.name, _attr.value);
      }
    }

    if (currentElement.children && currentElement.children.length > 0) {
      for (const _text of currentElement.children) {
        const text = this.renderer.createText(_text);
        this.renderer.appendChild(el, text);
      }
    }

   // const br = this.renderer.createElement("br");
    //this.renderer.appendChild(this.element.nativeElement, br);
    this.renderer.setAttribute(el, "id", currentElement.id + this.DOM_ID_INCREMENTER );
    console.log("created :::", el);
    this.renderer.appendChild(this.element.nativeElement, el);
    this.renderer.listen(el, "click", evt => {
      console.log("element clicked LISTEN", el);
      this.__detectClick(el);
    });
    this.DOM_ID_INCREMENTER++;
  }


  __subscribeToElementChange() {
    let _el:Element = null;
    this.studioService.elementChangeNotify().subscribe(element => {
      console.log('this element has changed from right sidebar', element);
      _el = this.element.nativeElement.querySelector(`#${element.id}`);
      console.warn('element being changed :: ', _el);
      _el.setAttributeNS(null,"cdkDrag","");

      for (const _attr of element.attributes) {
        _el.setAttribute(_attr.name, _attr.value);
      }
      for (const _class of element.classes) {
        _el.className=_class;
      }

      if(_el.hasChildNodes) _el.firstChild.nodeValue = element.children[0];


    }, error => {
      console.error('element change error!', error);
    })
  }
  __removeElementSelected() {
    let _el:Element = null;
    this.studioService.elementSelectedNotify().subscribe(element => {
      console.log('this element has been selected from right sidebar', element);
      _el = this.element.nativeElement.querySelector(`#${element.id}`);
      this.element.nativeElement.removeChild(_el);
      console.warn('element being removed :: ', _el);
      this.DOM_ID_INCREMENTER--;


    }, error => {
      console.error('element delete error!', error);
    })
  }

  __detectClick(element: Element) {
    const _el = this.convertToUiElement(element);
    console.log("helloooooo", _el);

   this.studioService.notifyOfElementClicked(_el);
  }

  convertToUiElement(el: Element): UiElement {
    const _uiElement: UiElement = {
      id: el.getAttribute("id"),
      classes: el.getAttribute("class").split(" "),
      attributes: el
        .getAttributeNames()
        .filter(attr => attr !== "class")
        .map(attr => {
          return {
            name: attr,
            value: el.getAttribute(attr)
          };
        }),
      children: el.hasChildNodes? [el.firstChild.nodeValue] : []
    };

    return _uiElement;
  }


  /** ENF OF PR */

  createCopy(origin) {
    return JSON.parse(JSON.stringify(origin));
  }


  toggleChild() {
    console.log("child toggled");
    this.studioService.setRunning(true);
  }

}
