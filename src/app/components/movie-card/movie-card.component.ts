import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './movie-card.component.html',
})
export class MovieCardComponent {
  @Input() movie!: Movie;

  constructor(private router: Router) {}

  formatDate(date: Date) {
    return new Date(date).toLocaleDateString();
  }
}
