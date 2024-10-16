import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private api = 'http://localhost:5000/api/movie';

  constructor(private http: HttpClient) {}

  public getAllMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.api);
  }

  public getMovieById(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.api}/${id}`);
  }
}
