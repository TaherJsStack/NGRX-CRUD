import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { BookActions } from '../actions';
import { BookModel } from './../../Models/book.model';

export interface State extends EntityState<BookModel> {
  selectedBookId: number | string | any | undefined;
}

export const adapter: EntityAdapter<BookModel> = createEntityAdapter<BookModel>(
  {
    selectId: (x) => x.id,
    sortComparer: false,
  }
);

const initialState: State = adapter.getInitialState({
  selectedBookId: undefined,
});

export const bookReducer = createReducer(
  initialState,
  on(BookActions.fetchBooksListSuccess, (state, { response }) => {
    return adapter.setAll(response, state);
  }),
  on(BookActions.selectBook, (state, { bookId }) => {
    return {
      ...state,
      selectedBookId: bookId,
    };
  }),
  on(BookActions.addNewBook, (state, { NewBookModelData }) => {
    return adapter.addOne(NewBookModelData, state);
  }),
  on(BookActions.updateBook, (state, { updateBookModelData }) => {
    return adapter.updateOne(
      { id: updateBookModelData.id, changes: updateBookModelData },
      state
    );
  }),
  on(BookActions.deleteBook, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),
  on(BookActions.clearBookList, (state) => {
    return adapter.removeAll({ ...state, selectedUserId: null });
  })
);

export const selectedId = (state: State) => state.selectedBookId;
