import { Component, OnInit } from '@angular/core';

import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { Reservation } from '../models/cart';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  reservations: Reservation[] = [];
  totalPrice: number = 0;

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {}

  getReservations() {
    return this.cartService
      .getReservationsForUser()
      .subscribe((reservations) => {
        this.reservations = reservations;
        this.calculateTotalPrice();
      });
  }

  cancelReservation(cartId: string) {
    if (confirm('Do you want to cancel this reservation?')) {
      return this.cartService
        .cancelReservation(cartId)
        .subscribe(() => this.getReservations());
    }
    return null;
  }

  markReservationAsWatched(cartId: string) {
    return this.cartService
      .markReservationAsWatched(cartId)
      .subscribe(() => this.getReservations());
  }

  calculateTotalPrice() {
    this.totalPrice = this.reservations.reduce(
      (sum, reservation) => sum + reservation.projection.price,
      0
    );
  }

  ngOnInit() {
    this.getReservations();
  }

  formatDateAndTime(date: Date) {
    return new Date(date).toLocaleString();
  }
}
