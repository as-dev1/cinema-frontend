import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Projection } from '../models/projection';

@Injectable({
  providedIn: 'root',
})
export class ProjectionService {
  private api = 'http://localhost:5000/api/projection';

  constructor(private http: HttpClient) {}

  public getAllProjections(): Observable<Projection[]> {
    return this.http.get<Projection[]>(this.api);
  }
}
