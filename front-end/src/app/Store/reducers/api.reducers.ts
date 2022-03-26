import { createReducer, on } from '@ngrx/store';

import { BookActions } from '../actions';
import { HttpErrorResponse } from '@angular/common/http';

export interface State {
  isLoading: boolean | undefined;
  error: HttpErrorResponse | undefined;
}

export const initialState: State = {
  isLoading: undefined,
  error: undefined,
};

export const apiReducer = createReducer(
  initialState,

  on(BookActions.fetchBooksListStart, (state, action) => {
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(BookActions.fetchBooksListSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
    };
  }),

  on(BookActions.fetchBooksListError, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      error,
    };
  })
);

export const isLoading = (state: State) => state.isLoading;
export const error = (state: State) => state.error;
