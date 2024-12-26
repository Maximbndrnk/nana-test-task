import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://www.omdbapi.com/';
  private apiKey = 'b5281cc';

  constructor(private http: HttpClient) {}

  search(query: string): Observable<any[]> {
    return this.http
      .get<any>(`${this.apiUrl}?i=tt3896198&s=${query}&apikey=${this.apiKey}`)
      .pipe(map((response) => {
        return response.Search || []
      }));
  }
}
