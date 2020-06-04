import { Component, OnInit , Input, ViewContainerRef, Output,EventEmitter, ViewChild, ElementRef} from '@angular/core';
import { ColorPickerService, Cmyk } from 'ngx-color-picker';
import { ScreensService } from '../../services/screens.service';
import { CenterLayoutComponent } from '../../center-layout/center-layout.component';

@Component({
  selector: 'ng-property-button',
  templateUrl: './property-button.component.html',
  styleUrls: ['./property-button.component.scss']
})
export class PropertyButtonComponent implements OnInit {
  @Input() showMe: boolean;

  colorpick:string;
  @Output() colorchanged = new EventEmitter<string>();
  @ViewChild('center') center:ElementRef

  public toggle: boolean = false;

  public rgbaText: string = 'rgba(165, 26, 214, 0.2)';

  public arrayColors: any = {
    color1: '#2883e9',
    color2: '#e920e9',
  };

  public selectedColor: string = 'color1';

  public color1: string = '#fff';


  public cmykValue: string = '';

  public cmykColor: Cmyk = new Cmyk(0, 0, 0, 0);



  constructor(public vcRef: ViewContainerRef, private cpService: ColorPickerService,
              private screenService:ScreensService,
             ) {
                this.screenService.callMyFunction();
              }
  ngOnInit() {
    // console.log("List drop",this.center.nativeElement);
  }


        changeColor(event) {
          this.colorchanged.emit(this.colorpick);

        }
        colorselected:string;
        getColor(event) {
          console.log(event);
          this.colorselected=String(event);
          console.log(this.colorselected);
        }

        sendProperties() {
          this.colorchanged.emit(this.colorselected);
          console.log(this.colorselected);
      }


  public onEventLog(event: string, data: any): void {
    console.log(event, data);
  }

  public onChangeColor(color: string): void {
    console.log('Color changed:', color);
  }


  public onChangeColorHex8(color: string): string {
    const hsva = this.cpService.stringToHsva(color, true);

    if (hsva) {
      return this.cpService.outputFormat(hsva, 'rgba', null);
    }

    return '';
  }

}
