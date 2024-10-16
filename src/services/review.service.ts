import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateReview, Review } from '../models/review';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private api = 'http://localhost:5000/api/review';

  constructor(private http: HttpClient) {}

  public getReviewsByMovieId(id: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.api}/${id}`);
  }

  public createReview(review: CreateReview): Observable<CreateReview> {
    return this.http.post<CreateReview>(this.api, review, {
      withCredentials: true,
    });
  }
}
