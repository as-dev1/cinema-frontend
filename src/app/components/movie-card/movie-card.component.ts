import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './movie-card.component.html',
})
export class MovieCardComponent {
  @Input() movie!: Movie;

  constructor() {}

  formatDate(date: Date) {
    return new Date(date).toLocaleDateString();
  }

  shortDescription(description: string) {
    return description.substring(0, 90) + '...';
  }
}
