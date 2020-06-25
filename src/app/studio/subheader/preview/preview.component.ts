import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { EditProjectComponent } from '../../../pages/dashboard/projects/edit-project/edit-project.component';
import { FormBuilder, Validators } from '@angular/forms';
import { StudioService } from '../../services/studio.service';

let width=0;
let height=0;
@Component({
  selector: 'ng-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit,AfterViewInit {

  @ViewChild("phone_1", { static: false }) phone:ElementRef;
  @ViewChild("frame_1", { static: false }) frame:ElementRef;
  @ViewChild("wrapper", { static: false }) wrapper:ElementRef;
  @ViewChild("iframePerspective", { static: false }) iframePerspective:ElementRef;
  @ViewChild("controls", { static: false }) controls:ElementRef;
  @ViewChild("views", { static: false }) views:ElementRef;
  @ViewChild("phones", { static: false }) phones:ElementRef;
  @Input() title: string;

  s = new XMLSerializer();
  parser = new DOMParser();

  html;
  constructor(protected ref: NbDialogRef<EditProjectComponent>,
              private fb: FormBuilder,private renderer:Renderer2,
              private studioService:StudioService) {


   }

   // tslint:disable-next-line: use-lifecycle-interface
   ngAfterViewChecked() {

   }
  ngOnInit() {
    //this.doc = this.parser.parseFromString(this.str, "text/xml");
    //this.divDoc=this.doc.getRootNode();
    //console.log('Document', this.doc);
  }
 // html_string='<html><head><script type="module" src="https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.esm.js"></script><script nomodule src="https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.js"></script><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@ionic/core/css/ionic.bundle.css"/></head><body><h1>rf</h1></body></html>';
   ngAfterViewInit() {
    //const element:ElementRef=null;
    /*this.html ='<html><head><script type="module" src="https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.esm.js"></script><script nomodule src="https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.js"></script><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@ionic/core/css/ionic.bundle.css"/></head><body>'+this.element+'</body></html>';
    const frm=this.frame;
    frm.nativeElement.src  ='data:text/html,' + encodeURIComponent(this.html);
    console.log("frame",this.frame.nativeElement)
  */
  }

  dismiss() {
    this.ref.close();
  }

  onclick(){
     const doc=this.frame.nativeElement.contentWindow.document;
    doc.open();
    doc.write('Test');
    doc.close();
    console.log("doc",doc);
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
