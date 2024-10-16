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

  constructor(private http: HttpClient) {}

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

  public getForReservationRoute(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.api}/reservation`, {
      withCredentials: true,
    });
  }

  public cancelReservation(cartId: string): Observable<{}> {
    return this.http.put<{}>(
      `${this.api}/cancel/${cartId}`,
      {},
      {
        withCredentials: true,
      }
    );
  }

  public markReservationAsWatched(cartId: string): Observable<{}> {
    return this.http.put<{}>(
      `${this.api}/viewed/${cartId}`,
      {},
      {
        withCredentials: true,
      }
    );
  }
}
