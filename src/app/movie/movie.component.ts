import { Component, OnInit } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

import { MovieService } from '../services/movie.service';
import { Movie } from '../models/movie';
import { MovieCardComponent } from '../components/movie-card/movie-card.component';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [MovieCardComponent, LucideAngularModule],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css',
})
export class MovieComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.getMovies();
  }

  getMovies() {
    this.movieService.getAllMovies().subscribe((data) => {
      this.movies = data;
    });
  }
}
