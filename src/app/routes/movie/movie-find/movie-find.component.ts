import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-find',
  templateUrl: './movie-find.component.html',
  styleUrls: ['./movie-find.component.css']
})
export class MovieFindComponent implements OnInit {

  movies: Movie[] = [];

  selectedMovie: Movie | any;

  constructor(
    private ms: MovieService
  ) { }

  ngOnInit(): void {
    this.initMovieList();
  }

  initMovieList() {
    this.ms.getMovies().subscribe(result => {
      this.movies = result;
    })
  }

  onSelection(movie: Movie) {
    this.selectedMovie = movie;
  }
}
