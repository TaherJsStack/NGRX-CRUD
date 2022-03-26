import { BookModel } from './../Models/book.model';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';
import { getSelectedBookIdEntity } from '../Store/reducers';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.scss'],
})
export class MoreInfoComponent implements OnInit {
  bookInfo: BookModel;

  constructor(private store: Store) {
    this.bookInfo = <BookModel>{};
  }

  ngOnInit(): void {
    this.store.pipe(select(getSelectedBookIdEntity)).subscribe((data) => {
      if (data) {
        this.bookInfo = data;
      }
    });
  }
}
