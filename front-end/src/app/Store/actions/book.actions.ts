import { createAction, props } from '@ngrx/store';

import { BookModel } from './../../Models/book.model';
import { HttpErrorResponse } from '@angular/common/http';

export const fetchBooksListStart = createAction('[Books/fetchBooksListStart]');

export const fetchBooksListSuccess = createAction(
  '[Books/fetchBooksListSuccess]',
  props<{ response: BookModel[] }>()
);

export const fetchBooksListError = createAction(
  '[Books/fetchBooksListError]',
  props<{ error: HttpErrorResponse }>()
);

export const selectBook = createAction(
  '[Books/selectBook]',
  props<{ bookId: number }>()
);

export const addNewBook = createAction(
  '[Books/addNewBook]',
  props<{ NewBookModelData: BookModel }>()
);

export const updateBook = createAction(
  '[Books/updateBook]',
  props<{ updateBookModelData: BookModel }>()
);

export const deleteBook = createAction(
  '[Books/deleteBook]',
  props<{ id: number }>()
);

export const clearBookList = createAction('[Books/ClearBookList]');
