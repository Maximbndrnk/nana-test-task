import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://www.omdbapi.com/';
  private apiKey = 'YOUR_API_KEY';

  constructor(private http: HttpClient) {}

  search(query: string): Observable<any[]> {
    return this.http
      .get<any>(`${this.apiUrl}?s=${query}&apikey=${this.apiKey}`)
      .pipe(map((response) => response.Search || []));
  }
}
