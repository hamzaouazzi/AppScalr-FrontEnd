import { Component, OnInit } from '@angular/core';
import { SeoService } from './core/utils/seo.service';

@Component({
  selector: 'nb-app',
  template: '<router-outlet> </router-outlet>',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {

  constructor( private seoService: SeoService) {
  }

  ngOnInit(): void {
    this.seoService.trackCanonicalChanges();
  }
}
