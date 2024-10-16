import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

import { MovieService } from '../../services/movie.service';
import { ReviewService } from '../../services/review.service';
import { AuthService } from '../../services/auth.service';
import { CreateReview, Review } from '../../models/review';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './movie-detail.component.html',
})
export class MovieDetailComponent implements OnInit {
  movieId: string | undefined;
  movie: Movie | undefined;
  reviews: Review[] = [];

  userId: string | undefined;
  rating: number = 0;
  comment: string = '';

  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private reviewService: ReviewService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  // if user enter wrong movie id mannually in url redirect to /movies
  getMovie() {
    this.movieService.getMovieById(this.movieId!).subscribe({
      next: (data) => {
        this.movie = data;
      },
      error: () => {
        this.router.navigateByUrl('/movies');
      },
    });
  }

  getReviews() {
    this.reviewService.getReviewsByMovieId(this.movieId!).subscribe((data) => {
      this.reviews = data;
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.movieId = params['id'];
    });

    this.getMovie();
    this.getReviews();
  }

  onSubmit() {
    if (this.authService.user?._id) {
      const newReview: CreateReview = {
        movie: this.movieId!,
        user: this.authService.user._id,
        rating: this.rating,
        comment: this.comment,
      };

      this.reviewService.createReview(newReview).subscribe({
        next: () => {
          this.getReviews();
          this.rating = 0;
          this.comment = '';
        },
        error: (error) => {
          this.toastr.error(
            error.error.message || 'Something went wrong',
            undefined,
            {
              timeOut: 2000,
            }
          );
        },
      });
    } else {
      this.router.navigateByUrl('login');
    }
  }

  formatDate(date: Date | undefined) {
    if (!date) {
      return 'Unknown';
    }
    return new Date(date).toLocaleDateString();
  }
}
