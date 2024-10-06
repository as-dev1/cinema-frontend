import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User, UserUpdate } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = 'http://localhost:5000/api/user';
  public isLoggedIn = false;
  public user: undefined | User;

  constructor(private http: HttpClient) {
    this.checkIsLoggedIn();
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.api}/me`, { withCredentials: true });
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

  register(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Observable<User> {
    return this.http.post<User>(
      `${this.api}/register`,
      {
        firstName,
        lastName,
        email,
        password,
      },
      { withCredentials: true }
    );
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(
      `${this.api}/login`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );
  }

  logout(): void {
    this.http
      .post(`${this.api}/logout`, {}, { withCredentials: true })
      .subscribe(
        () => {
          this.isLoggedIn = false;
          this.user = undefined;
        },
        (error) => {
          console.error('Logout failed', error);
        }
      );
  }

  update(user: UserUpdate): Observable<UserUpdate> {
    return this.http.put<UserUpdate>(`${this.api}/edit-profile`, user, {
      withCredentials: true,
    });
  }
}
