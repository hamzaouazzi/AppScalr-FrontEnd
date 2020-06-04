import { Component, OnInit, Inject, ViewChild, AfterViewInit, ElementRef, Input, Output } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ColorPickerService, Cmyk } from 'ngx-color-picker';
import {
  CdkDragDrop,
  moveItemInArray,
  CdkDrag,
  CdkDropList,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {Zoom} from '../center-layout/model/zoom.model';
import { ScreensService } from '../services/screens.service';
import { PropertyPageComponent } from '../right-sidebar/property-page/property-page.component';
import { D3Service, D3, Selection } from 'd3-ng2-service';
import { UiCategory } from '../models/UiCategory.model';
import { UiElement } from '../models/UiElement.model';
import { StudioService } from '../services/studio.service';

@Component({
  selector: 'ng-center-layout',
  templateUrl: './center-layout.component.html',
  styleUrls: ['./center-layout.component.scss'],
})
export class CenterLayoutComponent implements OnInit,AfterViewInit {

    @ViewChild('framecontainer', {static:false}) frame;
    @ViewChild('listDrop', {static:false}) element;
    @ViewChild('ColorPicker', {static:false}) ColorPicker;
    @ViewChild('sel', {static:false}) select;
    @ViewChild('ios', {static:false}) ioshead;
    @ViewChild('android', {static:false}) androidhead;
    @ViewChild('zoomin', {static:false}) zoomin;
    @ViewChild('zoomout', {static:false}) zoomout;
    @ViewChild(PropertyPageComponent) page:PropertyPageComponent;
    @Input() categories: UiCategory[];
    @Input()elements:UiElement[];

    private d3: D3;
    showVar: boolean = false;

    answers:UiElement[] = [];

    public selectedColor: string = 'color1';
    public color1: string = '#fff';
    optionSelected;
    valueSelected;
    $scope;
    received:string;


  constructor(private screenService:ScreensService,
              private cpService: ColorPickerService,
              private studioService:StudioService,
              private d3Service: D3Service,
              private center:ElementRef) {
        this.d3 = d3Service.getD3(); // <-- obtain the d3 object from the D3 Service
        studioService.myBool$.subscribe((newBool: boolean) => { this.showVar = newBool; });
    /* this.screenService.myFunctionCalled$.subscribe(
      res => console.log("property elm",this.page),
      err => console.log('MyService error', err)
  );
 */
   }
  ngAfterViewInit() {
    if (this.element) {
      console.log("Drop list", this.element);
      console.log("picker", this.ColorPicker);
      // console.log("seleect", this.selectedValue);
     } else {
      console.log("Droplist Not found !!", this.element);

     }

  }

  ngOnInit() {
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
    this.received=event.color;

  }

  changeColor(event) {
    this.element.nativeElement.style.backgroundColor=event.color;

  }

  selectedValue: number;

  zoomArray: Zoom[] = [
    {
      id:0.5,
      name:'50%'
    },
    {
      id:0.75,
      name:'75%'
    },
    {
      id:0.9,
      name:'90%'
    },
    {
      id:1,
      name:'100%'
    },
  ]
  zoomArr = [0.5, 0.75, 0.9, 1];

  indexofArr = 4;

  // value = this.frame.nativeElement.getBoundingClientRect().width / this.frame.nativeElement.offsetWidth;


  handleChange () {
    console.log("this is handle change method !");
    console.log("element",this.frame);
    const  val: number = this.selectedValue;
    console.log('handle change selected value ', val);
    this.indexofArr = this.zoomArr.indexOf(val);
    console.log('Handle changes', this.indexofArr);
    this.frame.nativeElement.style['transform'] = `scale(${val})`;
  }

  /* zmin = this.zoomin.nativeElement.addEventListener('click', () => {
    console.log('value of index zoomin is', this.indexofArr);
    if (this.indexofArr < this.zoomArr.length - 1 ) {
      this.indexofArr += 1;
      this.value = this.zoomArr[this.indexofArr];
      // let res1: string|number = document.querySelector<HTMLInputElement>('#sel').value ;
      // res1 = this.value;
      // console.log('current value is',value)
      // console.log('scale value is',value)
      this.element.style['transform'] = `scale(${this.value})`;
    }
  });

    zout = this.zoomout.nativeElement.addEventListener('click', ( ) => {
    console.log('value of index  zoom out is', this.indexofArr);
      if (this.indexofArr > 0) {
        this.indexofArr -= 1;
        this.value = this.zoomArr[this.indexofArr];
        // let res2: string|number = document.querySelector<HTMLInputElement>('#sel').value ;
        // res2 = this.value;
      // console.log('scale value is',value)
      this.element.style['transform'] = `scale(${this.value})`;
      }
    }); */

  public cmykValue: string = '';

  public cmykColor: Cmyk = new Cmyk(0, 0, 0, 0);
  public onEventLog(event: string, data: any): void {
    console.log(event, data);
  }

  public onChangeColor(color: string): void {
    console.log('Color changed:', color);
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
      return this.cpService.outputFormat(hsva, 'rgba', null);
    }

    return '';
  }



  drop(event: CdkDragDrop<Element[]>) {
    console.log("Center column",event.item.data);
    this.studioService.onTalkDrop(event);
}


  createCopy(origin) {
    return JSON.parse(JSON.stringify(origin));
  }

   /* resetList() {
      this.defaultAnswers = [];
      setTimeout(() => {
        this.defaultAnswers = this.defaultAnswersOrigin.slice();
      }, 0);
    }
 */

    toggleChild() {
      this.studioService.setRunning(true);
     // this.showVar = !this.showVar;
  }

}

