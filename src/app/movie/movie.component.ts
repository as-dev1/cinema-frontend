import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie';
import { MovieCardComponent } from '../components/movie-card/movie-card.component';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [FormsModule, NgFor, MovieCardComponent],
  templateUrl: './movie.component.html',
})
export class MovieComponent implements OnInit {
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  isLoading: boolean = false;

  nameInput: string = '';
  descriptionInput: string = '';
  selectedGenre: string = '';
  selectedDuration: string = '';
  selectedProducer: string = '';
  selectedActor: string = '';

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.getMovies();
  }

  getMovies() {
    this.isLoading = true;
    this.movieService.getAllMovies().subscribe({
      next: (data) => {
        this.movies = data;
        this.filteredMovies = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  filterMovies() {
    const nameInputLowerCase = this.nameInput.toLowerCase().trim();
    const descriptionInputLowerCase = this.descriptionInput
      .toLowerCase()
      .trim();

    this.filteredMovies = this.movies.filter(
      (movie) =>
        movie.name.toLowerCase().includes(nameInputLowerCase) &&
        (descriptionInputLowerCase
          ? movie.description.toLowerCase().includes(descriptionInputLowerCase)
          : true) &&
        (this.selectedGenre ? movie.genre === this.selectedGenre : true) &&
        (this.selectedProducer
          ? movie.producer === this.selectedProducer
          : true) &&
        (this.selectedActor
          ? movie.actors.some((actor) => actor.includes(this.selectedActor))
          : true) &&
        this.filterByDuration(movie.duration)
    );

    if (this.filteredMovies.length === 0) {
      this.isLoading = false;
    }
  }

  filterByDuration(duration: number): boolean {
    if (this.selectedDuration === 'short') {
      return duration < 100;
    } else if (this.selectedDuration === 'medium') {
      return duration >= 100 && duration <= 120;
    } else if (this.selectedDuration === 'long') {
      return duration > 120;
    }
    return true;
  }

  clearFilter() {
    this.nameInput = '';
    this.selectedGenre = '';
    this.selectedDuration = '';
    this.selectedProducer = '';
    this.selectedActor = '';
    this.filterMovies();
  }
}
