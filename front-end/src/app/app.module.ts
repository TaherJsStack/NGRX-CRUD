import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BookEffects } from './Store/effects/book.effects';
import { BrowserModule } from '@angular/platform-browser';
import { DataTableComponent } from './data-table/data-table.component';
import { EffectsModule } from '@ngrx/effects';
import { FormComponent } from './form/form.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { reducers } from './Store/reducers';
import { MoreInfoComponent } from './more-info/more-info.component';
import { NotFoundComponent } from './not-found/not-found.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DataTableComponent,
    FormComponent,
    MoreInfoComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ book: reducers }),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([BookEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
