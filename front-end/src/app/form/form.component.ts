import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { addNewBook, updateBook } from '../Store/actions/book.actions';

import { BookModel } from './../Models/book.model';
import { getSelectedBookIdEntity } from './../Store/reducers/index';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Output() openForm = new EventEmitter<Boolean>(); // for mobil view => to close modal

  isUpdateForm: boolean = false;
  form: FormGroup;
  updateId: number;
  submitError: boolean;

  constructor(private fb: FormBuilder, private store: Store) {
    this.form = new FormGroup({});
    this.updateId = 0;
    this.submitError = false;
  }

  ngOnInit(): void {
    this.formInitializer();
    this.store.pipe(select(getSelectedBookIdEntity)).subscribe((updateData) => {
      if (updateData) {
        this.isUpdateForm = true;
        this.formUpdate(updateData);
        this.updateId = updateData.id;
      }
    });
  }

  formInitializer() {
    this.form = this.fb.group({
      bookTitle: new FormControl('', [Validators.required]),
      bookPrice: new FormControl('', [Validators.required]),
      authorName: new FormControl('', [Validators.required]),
      authorEmail: new FormControl('', [Validators.required]),
      contactNumber: new FormControl('', [Validators.required]),
    });
  }

  formUpdate(updateData: BookModel) {
    this.form.setValue({
      bookTitle: updateData.bookTitle,
      bookPrice: updateData.bookPrice,
      authorName: updateData.authorName,
      authorEmail: updateData.authorEmail,
      contactNumber: updateData.contactNumber,
    });
  }

  AddNewBook() {
    if (!this.form.valid) {
      this.submitError = true;
      return;
    }

    this.submitError = false;

    const newBook: BookModel = {
      id: Math.random().toString().slice(2, 4),
      authorEmail: this.form.value.authorEmail,
      authorName: this.form.value.authorName,
      bookPrice: this.form.value.bookPrice,
      bookTitle: this.form.value.bookTitle,
      contactNumber: this.form.value.contactNumber,
    };

    if (this.isUpdateForm) {
      newBook.id = this.updateId;
      this.store.dispatch(updateBook({ updateBookModelData: newBook }));
    } else {
      this.store.dispatch(addNewBook({ NewBookModelData: newBook }));
    }
    this.openForm.emit(false);

    this.isUpdateForm = false;
    this.form.reset();
  }
}
