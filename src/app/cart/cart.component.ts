import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { CartService } from '../../services/cart.service';
import { Reservation } from '../../models/cart';
import { formatDateAndTime } from '../../lib/formatTime';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  reservations: Reservation[] = [];
  totalPrice: number = 0;
  formatDateAndTime = formatDateAndTime;

  constructor(
    private cartService: CartService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  getReservations() {
    return this.cartService
      .getReservationsForUser()
      .subscribe((reservations) => {
        this.reservations = reservations;
        this.calculateTotalPrice();
      });
  }

  ngOnInit() {
    this.getReservations();
  }

  cancelReservation(cartId: string) {
    if (confirm('Do you want to cancel this reservation?')) {
      return this.cartService.cancelReservation(cartId).subscribe({
        next: () => {
          this.getReservations();
          this.router.navigateByUrl('/reservation');
        },
        error: (error) => console.log(error),
      });
    }
    return null;
  }

  markReservationAsWatched(cartId: string) {
    return this.cartService.markReservationAsWatched(cartId).subscribe({
      next: () => {
        this.getReservations();
        this.router.navigateByUrl('/reservation');
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
  }

  calculateTotalPrice() {
    this.totalPrice = this.reservations.reduce(
      (sum, reservation) => sum + reservation.projection.price,
      0
    );
  }
}
