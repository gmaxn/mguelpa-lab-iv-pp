import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ReflectiveInjector, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Actor } from 'src/app/models/actor';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-movie-new-form',
  templateUrl: './movie-new-form.component.html',
  styleUrls: ['./movie-new-form.component.css']
})
export class MovieNewFormComponent implements OnInit, OnChanges {

  form: FormGroup | any;
  picture: FormGroup | undefined;

  @Input() selectedActor: Actor | undefined;

  @Output() newMovie: EventEmitter<Movie> = new EventEmitter<Movie>()

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnChanges(): void {
    this.form.patchValue({
      actor: this.selectedActor?.nombre
    })
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    // Profile Info Form Initialization
    this.form = this.fb.group({
      estreno: '',
      imageUrl: '',
      nombre: '',
      publico: '',
      actor: this.selectedActor?.nombre,
      tipo: '',
      uid: [''],
    });
  }

  onSubmit() {
    const movie = this.form.value as Movie;
    const picture = null;
    this.newMovie.emit(movie);
  }

  onSelectedActor(actor: Actor) {
    this.selectedActor = actor;
  }

  changeType(e:Event) {
    const value = (<HTMLOptionElement>e.target).value;
    if (this.form) {
      this.form.patchValue({
        tipo: value
      });
    }
  }
}
