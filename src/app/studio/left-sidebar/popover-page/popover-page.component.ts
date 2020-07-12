import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageRequest } from '../../../core/model/page-request.model';
import { StudioService } from '../../services/studio.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'ng-popover-page',
  templateUrl: './popover-page.component.html',
  styleUrls: ['./popover-page.component.scss']
})
export class NgPopoverPageComponent implements OnInit,OnDestroy {

  id:number;
  newPage:PageRequest = new PageRequest();
  submitted = false;
  subscription: Subscription;

  constructor(private studioService: StudioService,
              private route: ActivatedRoute) {
                this.subscription = this.studioService.getID().subscribe(data=>{this.id = data;console.log("Id-Pop",this.id )});
               }

  ngOnInit() {
    //this.id = this.route.snapshot.params['id'];

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

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
}

}
