import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryGridComponent } from './components/common/country-grid/country-grid.component';
import { MovieGridComponent } from './components/movie/movie-grid/movie-grid.component';
import { ActorGridComponent } from './components/actor/actor-grid/actor-grid.component';
import { ActorDetailsFormComponent } from './components/actor-details-form/actor-details-form.component';
import { MovieDetailsFormComponent } from './components/movie/movie-details-form/movie-details-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    CountryGridComponent, 
    MovieGridComponent, 
    ActorGridComponent,
    ActorDetailsFormComponent,
    MovieDetailsFormComponent
  ],
  exports: [
    CountryGridComponent, 
    MovieGridComponent, 
    ActorGridComponent,
    ActorDetailsFormComponent,
    MovieDetailsFormComponent
  ]
})
export class AppSharedModule { }
