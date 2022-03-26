import * as fromAPI from './api.reducers';
import * as fromBook from './book.reducer';

import {
  Action,
  combineReducers,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import { adapter } from './book.reducer';

export interface BookState {
  book: fromBook.State;
  api: fromAPI.State;
}

export function reducers(state: BookState, action: Action): any {
  return combineReducers({
    book: fromBook.bookReducer,
    api: fromAPI.apiReducer,
  })(state, action);
}

const featureSelector = createFeatureSelector<BookState>('book');

const bookSelector = createSelector(featureSelector, (x) => x.book);

const apiSelector = createSelector(featureSelector, (x) => x.api);

const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors(bookSelector);

export const bookEntities = selectAll;
const getSelectedId = createSelector(bookSelector, fromBook.selectedId);

export const getSelectedBookIdEntity = createSelector(
  bookEntities,
  getSelectedId,
  (entities, id) => {
    return id && entities[id - 1];
  }
);

export const getApiLoading = createSelector(apiSelector, fromAPI.isLoading);

export const getApiError = createSelector(apiSelector, fromAPI.error);

export const getBookById = (id: number) =>
  createSelector(bookEntities, (allItems) => {
    if (allItems) {
      return allItems.find((item) => {
        return item.id === id;
      });
    } else {
      return {};
    }
  });
