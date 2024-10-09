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

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {}

  getReservations() {
    return this.cartService
      .getReservationsForUser()
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
