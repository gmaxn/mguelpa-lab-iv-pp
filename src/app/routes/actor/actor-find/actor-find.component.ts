import { Component, OnInit } from '@angular/core';
import { Actor } from 'src/app/models/actor';
import { Movie } from 'src/app/models/movie';
import { ActorService } from 'src/app/services/actor.service';

@Component({
  selector: 'app-actor-find',
  templateUrl: './actor-find.component.html',
  styleUrls: ['./actor-find.component.css']
})
export class ActorFindComponent implements OnInit {

  actors: Actor[] = [];

  selecteActor: Actor | any;

  selecteMovie: Movie | any;


  constructor(
    private as: ActorService
  ) { }

  ngOnInit(): void {
    this.initMovieList();
  }

  initMovieList() {
    this.as.getActors().subscribe(result => {
      this.actors = result;
    })
  }

  onSelection(actor: Actor) {
    this.selecteActor = actor;
  }

}
