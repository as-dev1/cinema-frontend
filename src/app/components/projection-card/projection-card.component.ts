import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Projection } from '../../models/projection';

@Component({
  selector: 'app-projection-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './projection-card.component.html',
})
export class ProjectionCardComponent {
  @Input() projection!: Projection;

  formatDate(date: Date) {
    return new Date(date).toLocaleString();
  }
}
