import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  AfterViewInit,
  ElementRef,
  Input,
  Output,
  Renderer2,
  TemplateRef,
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
import { NbDialogService, NbWindowService } from '@nebular/theme';
import { PageRequest } from '../../core/model/page-request.model';

let width=0;
let height=0;
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
  @ViewChild("contentpage", { static: false }) contentpage: ElementRef;
  @ViewChild(PropertyPageComponent) page: PropertyPageComponent;
  @ViewChild("phone_1", { static: false }) phone:ElementRef;
  @ViewChild("frame_1", { static: false }) ifram:ElementRef;
  @ViewChild("wrapper", { static: false }) wrapper:ElementRef;
  @ViewChild("iframePerspective", { static: false }) iframePerspective:ElementRef;
  @ViewChild("controls", { static: false }) controls:ElementRef;
  @ViewChild("views", { static: false }) views:ElementRef;
  @ViewChild("phones", { static: false }) phones:ElementRef;
  @Input() title: string;
  @Input() categories: UiCategory[];
  @Input() elements: UiElement[];
  @Input() id: string;

  private d3: D3;
  showVar: boolean = false;
  selectedPage:PageRequest;
  answers: UiElement[] = [];
  html;

  public selectedColor: string = "color1";
  public color1: string = "#fff";
  optionSelected;
  valueSelected;
  $scope;
  received: string;

  //observe DOM changes
  observer: MutationObserver;
   length =8;
   serialized = new XMLSerializer();
   parser = new DOMParser();
   str;
   doc;

  constructor(
    private screenService: ScreensService,
    private cpService: ColorPickerService,
    private studioService: StudioService,
    private d3Service: D3Service,
    private renderer: Renderer2,
    private dialogService: NbDialogService,
    private windowService: NbWindowService,
  ) {
    this.d3 = d3Service.getD3(); // <-- obtain the d3 object from the D3 Service
    studioService.myBool$.subscribe((newBool: boolean) => {
      this.showVar = newBool;
    });
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterContentChecked() {
    //console.log("SOMETHING");
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
    this._subscribeToPageSelected();
    //this._clearRemovedPage();
    this.__removeElementSelected();

  }



  /** use this to save the current DOM
   * so far we save in a component variable, persist this value with JSON.stringify()
   */
  _currentDOM : Element[] = [];


  domString:string;
  getDom() {

    this._currentDOM = [...this.element.nativeElement.childNodes];
    console.log('childnodes element  :::',...this.element.nativeElement.childNodes);
    console.log('showing save DOM  :::', this._currentDOM);
     //this.domString =  JSON.stringify(this._currentDOM);
    this.str = this.serialized.serializeToString(this.element.nativeElement);

      this.studioService.notifyOfDomSaved(this.str);

  }


  showDom() {

    console.log('showing save DOM  :::', this._currentDOM);

  //  console.log('showing dom', this.str.childNodes);


    for(const _el of this._currentDOM) {
      this.renderer.appendChild(this.element.nativeElement, _el);
    }

    // const t=this.renderer.createElement("div");
    // t.insertAdjacentHTML('afterbegin', this.str);

    //   console.log("this str",this.str) ;
    //  console.log("Length",t.firstChild.childNodes.length)

    // for(let i=0 ; i<t.firstChild.childNodes.length ; i++) {

    //   console.log("Child"+i,t.firstChild.childNodes[i])
    //   this.renderer.appendChild(this.element.nativeElement,t.firstChild.childNodes[i].cloneNode(true));

    // }
    // console.log("Dom elements",this.element.nativeElement);
  }

  /* Handling page selected */

  convertStringToHtml(str)  {
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, 'text/html');
    return (doc.body.firstChild.childNodes)
  }
  toArray(obj) {
    // tslint:disable-next-line: prefer-const
    let array = [];
    // iterate backwards ensuring that length is an UInt32
    for (let i = obj.length >>> 0; i--;) {
      array[i] = obj[i];
    }
    return array;
  }

  insertDomPage() {
    this.element.nativeElement.textContent  ='';
     const dd = this.convertStringToHtml(this.selectedPage.dom);
     this.toArray(dd);
     console.log(' DOM-Array  :::', ...this.toArray(dd));
     //const arr = Array.from(this.toArray(dd));
     this._currentDOM = [...this.toArray(dd)]
     // this._currentDOM = [...this.convertStringToHtml(this.selectedPage.dom)]
    //this._currentDOM =Array.from(this.convertStringToHtml(this.selectedPage.dom));
    console.log('current DOM  :::', this._currentDOM );

     for(const _el of this._currentDOM) {
      this.renderer.appendChild(this.element.nativeElement, _el);
      this.renderer.listen(_el, "click", evt => {
        console.log("element clicked LISTEN", _el);
        this.__detectClick(_el);
      });
    }
/*
    for(const _el of this._currentDOM) {
    this.renderer.listen(_el, "click", evt => {
      console.log("element clicked LISTEN", _el);
      this.__detectClick(_el);
    });
  } */
  }

  _subscribeToPageSelected() {
    this.studioService.subscribeToPage().subscribe(data=> {
      console.log('page selected', data);
      this.selectedPage = data;
      this.insertDomPage();
      //this.studioService.setRunning(true);
    });
  }
  _clearRemovedPage() {
    this.studioService.subscribeToPage().subscribe(data => {
      console.log('page deleted', data);
      this.element.nativeElement.textContent = '';
    });
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


  /***********************************************************
   * * HANDLE DROP EVENT FROM LEFT SIDEBAR INTO CENTER LAYOUT
   ***********************************************************
   */

   makeid(length) {
   let result           = '';
   const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   const charactersLength = characters.length;
   for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}


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

    //const br = this.renderer.createElement("br");
    //this.renderer.appendChild(this.element.nativeElement, br);
    this.renderer.setAttribute(el, "id", currentElement.id + this.makeid(this.length) );
    console.log("created :::", el);
    this.renderer.appendChild(this.element.nativeElement, el);
    this.renderer.listen(el, "click", evt => {
      console.log("element clicked LISTEN", el);
      this.__detectClick(el);
    });
  }


  __subscribeToElementChange() {
    let _el:Element = null;
    this.studioService.elementChangeNotify().subscribe(element => {
      console.log('this element has changed from right sidebar', element);
      _el = this.element.nativeElement.querySelector(`#${element.id}`);
      console.warn('element being changed :: ', _el);
      //_el.setAttributeNS(null,"cdkDrag","");

      for (const _attr of element.attributes) {
        _el.setAttribute(_attr.name, _attr.value);
      }

        for (const _class of element.classes) {
          _el.classList.add(_class);
        }

     /*  for (const _class of element.classes) {
        _el.className=_class;
      } */

      if(_el.hasChildNodes && _el.firstChild !=null ) _el.firstChild.nodeValue = element.children[0];


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
      children: el.hasChildNodes? [el.firstChild?.nodeValue] : []
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


  onShow() {
    this.html ='<html><head><script type="module" src="https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.esm.js"></script><script nomodule src="https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.js"></script><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@ionic/core/css/ionic.bundle.css"/></head><body  class="ion-padding">'+this.element.nativeElement.innerHTML+'</body></html>';
    const frm=this.ifram;
    frm.nativeElement.src  ='data:text/html,' + encodeURIComponent(this.html);
    console.log("frame",this.ifram.nativeElement)

  }
  open2(dialog: TemplateRef<any>) {

    this.dialogService.open(
      dialog,
      { context: 'this is some additional data passed to dialog' });
  }


/*View*/
 updateView(view) {
  if (view) {
    this.phone.nativeElement.className = "phone view_" + view;
  }
}

/*Controls*/
 updateIframe() {

  // preload iphone width and height
  this.phone.nativeElement.style.width = "375px";
  this.phone.nativeElement.style.height = "667px";

  this.wrapper.nativeElement.style.perspective = (
    this.iframePerspective.nativeElement.checked ? "1300px" : "none"
  );
}

scalePhone(evt,val) {
  console.log("event",val)

  if(val === 1) {
    // iphone
     width = 375;
     height = 667;
  }

  if(val === 2) {
    // samsung
    width = 400;
    height = 640;
  }

  if(val === 3) {
    // ipad mini
    width = 760;
    height = 775;
  }

    this.phone.nativeElement.style.width = width + "px";
    this.phone.nativeElement.style.height = height + "px";
}

afterLoading() {
  setTimeout(function() {
      this.phone.className = "phone view_1";
      setTimeout(function() {
          // do second thing
          this.phone.className = "phone view_1 rotate";
      }, 1000);
  }, 1000);

}




}
