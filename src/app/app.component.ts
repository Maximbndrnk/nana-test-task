import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { debounceTime, distinctUntilChanged, switchMap, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { saveQuery, loadResults } from './store/search.actions';
import { selectSearchResults } from './store/search.selectors';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling'; // Import for virtual scroll
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AsyncPipe, NgIf } from '@angular/common'; // Import scrolling module

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScrollingModule, AsyncPipe, ReactiveFormsModule, NgIf],
  template: `
    <div class="app-container">
      <h1>Search Application</h1>
      <input type="text" [formControl]="searchControl" placeholder="Search..." />

      <div *ngIf="loading$ | async">Loading...</div>

      <cdk-virtual-scroll-viewport itemSize="50" class="viewport">
        <ul>
          <li *cdkVirtualFor="let result of results$ | async">{{ result.Title }}</li>
        </ul>
      </cdk-virtual-scroll-viewport>

      <div *ngIf="error$ | async" class="error">{{ error$ | async }}</div>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private actions$ = inject(Actions);
  private apiService = inject(ApiService);
  private store = inject(Store);
  searchControl = new FormControl('');
  results$: Observable<any[]> = this.store.select(selectSearchResults);
  loading$: Observable<boolean> = this.store.select(state => state.search.loading);
  error$: Observable<string> = this.store.select(state => state.search.error);



  constructor() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter((query): query is string => query !== null && query.trim() !== ''),
        switchMap((query) => {
          this.store.dispatch(saveQuery({ query }));
          return this.apiService.search(query);
        })
      )
      .subscribe((results) => {
        this.store.dispatch(loadResults({ results }));
      });
  }
}
