import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from '../services/cart.service';
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

  constructor(private cartService: CartService, private router: Router) {}

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
      error: (error) => console.log(error),
    });
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
