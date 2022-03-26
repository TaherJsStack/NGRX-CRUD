import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('openBtn') openForm!: ElementRef;
  @ViewChild('closeBtn') closeForm!: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  openDataForm(isOpen: any) {
    if (isOpen) {
      this.openForm?.nativeElement.click();
    } else {
      this.closeForm.nativeElement.click();
    }
  }
}
