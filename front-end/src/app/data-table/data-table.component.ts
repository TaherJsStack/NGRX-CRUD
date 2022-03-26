import { ActivatedRoute, Router } from '@angular/router';
import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  bookEntities,
  getApiError,
  getApiLoading,
  getBookById,
  getSelectedBookIdEntity,
} from '../Store/reducers';
import { deleteBook, selectBook } from '../Store/actions/book.actions';

import { BookActions } from '../Store/actions';
import { BookModel } from './../Models/book.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { clearBookList } from './../Store/actions/book.actions';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit {
  @Output() openForm = new EventEmitter<Boolean>();

  bookList$: Observable<BookModel[]>;
  isLoading$: Observable<boolean | undefined>;
  error$: Observable<HttpErrorResponse | undefined>;

  dataLength = 0;

  innerWidth: number;
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
  }

  constructor(private store: Store, private router: Router) {
    this.innerWidth = window.innerWidth;

    this.store.dispatch(BookActions.fetchBooksListStart());

    this.bookList$ = this.store.pipe(select(bookEntities));

    this.isLoading$ = this.store.pipe(select(getApiLoading));
    this.error$ = this.store.pipe(select(getApiError));

    this.store.pipe(select(bookEntities)).subscribe((data) => {
      this.dataLength = data.length;
      this.openForm.emit(false);
    });
  }

  ngOnInit(): void {}

  editBook(bookId: number) {
    this.store.dispatch(selectBook({ bookId: bookId }));

    if (this.innerWidth <= 576) {
      this.openForm.emit(true);
    }
  }

  deleteBook(bookId: number) {
    this.store.dispatch(deleteBook({ id: bookId }));
  }

  moreInfo(bookId: any) {
    this.store.dispatch(selectBook({ bookId: bookId }));
    this.router.navigateByUrl('/more-info');
  }

  clearBookList() {
    this.store.dispatch(clearBookList());
  }
}
