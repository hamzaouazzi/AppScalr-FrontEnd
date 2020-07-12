import { NbMenuService } from '@nebular/theme';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-not-found',
  styleUrls: ['./not-found.component.scss'],
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent {

  constructor(private menuService: NbMenuService,private route:Router) {
  }

  goToHome() {
    this.route.navigate(['pages/dashboard']);
    //this.menuService.navigateHome();
  }
}
