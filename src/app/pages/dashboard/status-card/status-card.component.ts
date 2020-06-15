import { Component, Input } from '@angular/core';
import { NbIconLibraries } from '@nebular/theme';
@Component({
  selector: 'ngx-status-card',
  styleUrls: ['./status-card.component.scss'],
  templateUrl: './status-card.component.html',
})
export class StatusCardComponent {

  @Input() title: string;
  @Input() type: string;
  @Input() on = true;

  flipped = false;

  toggleView() {
    this.flipped = !this.flipped;
  }
}
