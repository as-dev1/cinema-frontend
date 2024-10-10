import { Component, OnInit } from '@angular/core';

import { Reservation } from '../models/cart';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css',
})
export class ReservationComponent implements OnInit {
  reservations: Reservation[] = [];

  constructor(private cartService: CartService) {}

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

  formatDateAndTime(date: Date) {
    return new Date(date).toLocaleString();
  }
}
