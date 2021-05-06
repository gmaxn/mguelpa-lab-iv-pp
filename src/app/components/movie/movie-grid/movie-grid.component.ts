import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-movie-grid',
  templateUrl: './movie-grid.component.html',
  styleUrls: ['./movie-grid.component.css']
})
export class MovieGridComponent implements OnInit {


  @Input() movies: Movie[] = [];
  @Output() selectedMovie: EventEmitter<Movie> = new EventEmitter<Movie>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelection(movie:Movie) {
    this.selectedMovie.emit(movie);
  }

}
