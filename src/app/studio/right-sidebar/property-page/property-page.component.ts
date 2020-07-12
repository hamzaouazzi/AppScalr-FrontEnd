import { Component, OnInit , Input, ViewContainerRef, Output,EventEmitter, ViewChild, ElementRef} from '@angular/core';
import { ColorPickerService, Cmyk } from 'ngx-color-picker';
import { ScreensService } from '../../services/screens.service';
import { CenterLayoutComponent } from '../../center-layout/center-layout.component';
import { StudioService } from '../../services/studio.service';
import { RightSidebarComponent } from '../right-sidebar.component';
import { PageRequest } from '../../../core/model/page-request.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ng-property-page',
  templateUrl: './property-page.component.html',
  styleUrls: ['./property-page.component.scss'],
})
export class PropertyPageComponent implements OnInit {

  @Input() showMe: boolean;
  @Output() colorchanged = new EventEmitter<string>();
  @ViewChild('center') center:ElementRef;
  idApp:number;
  selectedPage:PageRequest;
  domPage:string;
  colorpick:string;
  public toggle: boolean = false;
  idPageDelete:number;
  public rgbaText: string = 'rgba(165, 26, 214, 0.2)';

  public arrayColors: any = {
    color1: '#2883e9',
    color2: '#e920e9',
  };

  public selectedColor: string = 'color1';

  public color1: string = '#fff';


  public cmykValue: string = '';

  public cmykColor: Cmyk = new Cmyk(0, 0, 0, 0);

  public unique_key: number;
  public parentRef: RightSidebarComponent;



  constructor(public vcRef: ViewContainerRef,
              private cpService: ColorPickerService,
              private screenService:ScreensService,
              private studioService:StudioService,
              private route:ActivatedRoute
                                                  ) {
              studioService.myBool$.subscribe((newBool: boolean) => { this.showMe = newBool; });
              this.screenService.callMyFunction();
              }

  ngOnInit() {
    this.idApp = this.route.snapshot.params['id'];
    this.selectedPage = new PageRequest();
    this. _subscribeToPageSelected();
    this._subscribeToDomSaved();
    // console.log("List drop",this.center.nativeElement);
  }

  _subscribeToPageSelected() {
    this.studioService.subscribeToPage().subscribe(data=> {
      this.selectedPage = data;
     // this.studioService.setRunning(true);
    }, error => {
      console.error('error getting page selected')
    })
  }

  _subscribeToDomSaved() {
    this.studioService.domSavedNotify()
                      .subscribe(data=> {
                        this.domPage = data;
                        console.log("DOM-string::",this.domPage);

    })

  }

  updatePage() {
    this.selectedPage.dom = this.domPage;
    console.log("Page-content:",this.selectedPage);
    this.studioService.updatePage(this.selectedPage,this.selectedPage.pageid,this.idApp)
                      .subscribe(data => console.log("updatedPage:",data), error => console.log(error));

  }

  onSubmit() {
    this.updatePage();
  }

  deletePage(idpage:number) {
    this.idPageDelete=idpage;
    this.studioService.deletePage(this.selectedPage.pageid,this.idApp)
                      .subscribe(data => console.log(data), error => console.log(error));
    this.selectedPage.routeurl = "";
    this.selectedPage.pagetitle = "";
    this.studioService.notifyOfPageDeleted(this.selectedPage);


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

  /* remove_me() {
    console.log(this.unique_key)
    this.parentRef.remove(this.unique_key)
  } */

}
