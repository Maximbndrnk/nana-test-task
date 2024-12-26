import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../api.service';
import { loadResults, saveQuery } from './search.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class SearchEffects {
  private actions$ = inject(Actions);
  private apiService = inject(ApiService);


  loadSearchResults$ = createEffect(() => {
    console.log('ApiService:', this.apiService);
    console.log('Actions:', this.actions$);

    return this.actions$.pipe(
      ofType(saveQuery),
      switchMap(({ query }) =>
        this.apiService.search(query).pipe(
          map((results) => loadResults({ results })),
          catchError(() => of(loadResults({ results: [] })))
        )
      )
    );
  });
}
