import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/user/me';
  public isLoggedIn = false;
  public user: undefined | User;

  constructor(private http: HttpClient) {
    this.checkIsLoggedIn();
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(this.apiUrl, { withCredentials: true });
  }

  checkIsLoggedIn(): void {
    this.getCurrentUser().subscribe(
      (data) => {
        this.isLoggedIn = true;
        this.user = data;
      },
      (error) => {
        this.isLoggedIn = false;
      }
    );
  }
}
