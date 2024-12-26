import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Observable, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  searchControl = new FormControl('');
  results$: Observable<any[]>;
  pastQueries$: Observable<string[]>;

  constructor(private apiService: ApiService, private store: Store) {
    this.results$ = this.store.select(selectSearchResults);
    this.pastQueries$ = this.store.select(selectPastQueries);
  }

  ngOnInit(): void {
    // Listen to search input changes
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query) => {
          if (query.trim() === '') return [];
          this.store.dispatch(saveQuery({ query }));
          return this.apiService.search(query);
        })
      )
      .subscribe((results) => {
        this.store.dispatch(loadResults({ results }));
      });
  }

  // Handle suggestion click
  selectSuggestion(query: string): void {
    this.searchControl.setValue(query);
  }
}
