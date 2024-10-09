import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Cart, Reservation } from '../models/cart';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private api = 'http://localhost:5000/api/cart';

  constructor(private http: HttpClient, private authService: AuthService) {}

  public createReservation(reservation: Cart): Observable<Cart> {
    return this.http.post<Cart>(this.api, reservation, {
      withCredentials: true,
    });
  }

  public getReservationsForUser(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.api, {
      withCredentials: true,
    });
  }

  public markReservationAsViewed(cartId: string): Observable<Cart> {
    return this.http.put<Cart>(
      `${this.api}/viewed/${cartId}`,
      {},
      {
        withCredentials: true,
      }
    );
  }
}
