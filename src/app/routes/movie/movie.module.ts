import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieRoutingModule } from './movie-routing.module';
import { MovieNewComponent } from './movie-new/movie-new.component';
import { MovieGridComponent } from 'src/app/components/movie/movie-grid/movie-grid.component';
import { AppSharedModule } from 'src/app/app-shared.module';
import { MovieNewFormComponent } from 'src/app/components/movie/movie-new-form/movie-new-form.component';
import { MovieFindComponent } from './movie-find/movie-find.component';
import { MovieDetailsFormComponent } from 'src/app/components/movie/movie-details-form/movie-details-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MovieNewComponent,
    MovieNewFormComponent,
    MovieFindComponent
  ],
  imports: [
    CommonModule,
    AppSharedModule,
    MovieRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MovieModule { }
