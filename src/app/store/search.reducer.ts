import { createReducer, on } from '@ngrx/store';
import { saveQuery, loadResults } from './search.actions';

export interface SearchState {
  queries: string[];
  results: any[];
}

const initialState: SearchState = {
  queries: [],
  results: []
};

export const searchReducer = createReducer(
  initialState,
  on(saveQuery, (state, { query }) => ({
    ...state,
    queries: state.queries.includes(query) ? state.queries : [...state.queries, query]
  })),
  on(loadResults, (state, { results }) => ({ ...state, results }))
);
