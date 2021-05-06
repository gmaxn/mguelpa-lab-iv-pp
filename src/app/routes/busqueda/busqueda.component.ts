import { Component, Input, OnInit, Output } from '@angular/core';
import { Actor } from 'src/app/models/actor';
import { Country } from 'src/app/models/country';
import { Movie } from 'src/app/models/movie';
import { ActorService } from 'src/app/services/actor.service';
import { CountryService } from 'src/app/services/country.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  public prompt = false;
  actors: Actor[] = [];

  countries: Country[] = [];
  movies: Movie[] = [];

  filteredActors: Actor[] = [];
  filteredCountries: Country[] = [];
  filteredMovies: Movie[] = [];

  @Input() selectedActor: Actor | undefined;

  public selectedMovie: Movie | undefined;

  constructor(
    private as: ActorService,
    private cs: CountryService,
    private ms: MovieService
  ) { }

  ngOnInit(): void {

    this.initCountryList();
    this.initMovieList();
    this.initActorList();
  }

  initActorList() {
    this.as.getActors().subscribe(
      (result) => {
        this.actors = result;
      },
      (error) => {
        console.log(error);
      });
  }

  initMovieList() {
    this.ms.getMovies().subscribe(
      (result) => {
        this.movies = result;
      },
      (error) => {
        console.log(error);
      });
  }

  initCountryList() {
    this.cs.getCountries().subscribe(
      (result) => {
        this.countries = result;
      },
      (error) => {
        console.log(error);
      });
  }

  onCountrySelection(c: Country) {
    this.filteredActors = [];
    this.filteredMovies = this.movies.filter(m => m.nombre === c.name);
  }

  onMovieSelection(m: Movie) {
    this.selectedMovie = m;
    this.filteredActors = this.actors.filter(a => a.nombre === m.actor);
  }

  onActorSelection(e: Actor) {
    this.selectedActor = e;
  }
}
