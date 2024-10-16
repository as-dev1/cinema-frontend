import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

import { Reservation } from '../models/cart';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { CreateReview } from '../models/review';
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reservation.component.html',
})
export class ReservationComponent implements OnInit {
  reservations: Reservation[] = [];

  rating: number = 0;
  comment: string = '';

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private reviewService: ReviewService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  getReservations() {
    return this.cartService
      .getForReservationRoute()
      .subscribe((reservations) => {
        this.reservations = reservations;
      });
  }

  ngOnInit() {
    this.getReservations();
  }

  onSubmit(reservation: Reservation) {
    if (this.authService.user?._id) {
      const newReview: CreateReview = {
        movie: reservation.projection.movie._id!,
        user: this.authService.user._id,
        rating: this.rating,
        comment: this.comment,
      };

      this.reviewService.createReview(newReview).subscribe({
        next: () => {
          this.rating = 0;
          this.comment = '';
          this.router.navigateByUrl(
            `/movies/${reservation.projection.movie._id}`
          );
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

  navigateToMovie(reservation: Reservation) {
    this.router.navigateByUrl(`/movies/${reservation.projection.movie._id}`);
  }

  formatDateAndTime(date: Date) {
    return new Date(date).toLocaleString();
  }
}
