import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actor } from 'src/app/models/actor';
import { Country } from 'src/app/models/country';
import { Movie } from 'src/app/models/movie';
import { ActorService } from 'src/app/services/actor.service';
import { CountryService } from 'src/app/services/country.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-new',
  templateUrl: './movie-new.component.html',
  styleUrls: ['./movie-new.component.css']
})
export class MovieNewComponent implements OnInit {

  countries:Country[] = [];

  movies:Movie[] = [];

  actors:Actor[] = [];

  selectedActor: Actor | undefined;


  constructor(
    private cs: CountryService,
    private as:ActorService,
    private ms: MovieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initCountriesList();
    this.initActorList();
  }

  initCountriesList(): void {

    this.cs.getCountries().subscribe({
      next: response => {
        this.countries = response;
      },
      error: err => console.log(err)
    });
  }

  initActorList() {
    this.as.getActors().subscribe({
      next: response => {
        this.actors = response;
      },
      error: err => console.log(err)
    });
  }

  onSelectedActor(actor: Actor) {
    this.selectedActor = actor;
  }

  onNewMovie(movie: Movie) {
    const picture = null;
    this.ms.createMovie(movie, picture).then(
      (ok) => {
        this.router.navigate(['actor/new']);
      },
      (err) => {
        alert(err);
      }
    ).finally();
  }
}
