import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { BookState, bookEntities } from '../reducers';
import { Store, select } from '@ngrx/store';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import { BookActions } from '../actions';
import { BookService } from 'src/app/providers/book.service';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class BookEffects {
  constructor(
    private bookService: BookService,
    private action$: Actions,
    private store: Store<BookState>
  ) {}

  fetchBookList$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(BookActions.fetchBooksListStart),

        exhaustMap((e) => {
          return this.bookService.getAllBooks().pipe(
            map((bookList) => {
              let response = bookList.bookList;
              return BookActions.fetchBooksListSuccess({ response });
            }),

            catchError((error) => {
              return of(BookActions.fetchBooksListError({ error }));
            })
          );
        })
      ),
    { dispatch: true }
  );

  // addBookToCollectionSuccess$ = createEffect(
  //   () =>
  //     this.action$.pipe(
  //       ofType(BookActions.addNewBook),
  //       // concatLatestFrom((action) => this.store.pipe(select(bookEntities))),

  //       exhaustMap((data) => {
  //         console.log('exhaustMap =>', data.NewBookModelData);
  //         const bookData = data;

  //         return this.bookService.addNewBook(bookData).pipe(
  //           map((book) => {
  //             console.log('book addBook =============>', book);
  //             // return BookActions.;
  //           }),

  //           catchError((error) => {
  //             console.log('addBook catchError =============>', error);
  //             return of(BookActions.fetchBooksListError({ error }));
  //           })
  //         );
  //       })
  //     ),
  //   { dispatch: false }
  // );

  // afterFetchTodo$ = createEffect(
  //   () =>
  //     this.action$.pipe(
  //       ofType(BookActions.fetchBooksListStart),
  //       tap((response) => console.log(response))
  //     ),
  //   { dispatch: false }
  // );
}
