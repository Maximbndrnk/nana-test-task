import { createSelector } from '@ngrx/store';
import { SearchState } from './search.reducer';

export const selectSearchState = (state: any) => state.search;

export const selectPastQueries = createSelector(
  selectSearchState,
  (state: SearchState) => state.queries
);

export const selectSearchResults = createSelector(
  selectSearchState,
  (state: SearchState) => state.results
);
