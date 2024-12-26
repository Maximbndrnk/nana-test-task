import { createAction, props } from '@ngrx/store';

export const saveQuery = createAction(
  '[Search] Save Query', props<{ query: string }>());
export const loadResults = createAction(
  '[Search] Load Results', props<{ results: any[] }>());
