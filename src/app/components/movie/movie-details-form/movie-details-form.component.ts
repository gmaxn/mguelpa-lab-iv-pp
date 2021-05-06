import { formatDate } from '@angular/common';
import { ANALYZE_FOR_ENTRY_COMPONENTS, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actor } from 'src/app/models/actor';
import { Movie } from 'src/app/models/movie';
import { ActorService } from 'src/app/services/actor.service';
import { BlobStorageService } from 'src/app/services/blob-storage.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-details-form',
  templateUrl: './movie-details-form.component.html',
  styleUrls: ['./movie-details-form.component.css']
})
export class MovieDetailsFormComponent implements OnInit, OnChanges {

  default = '../../../assets/default-actor-avatar.jpg';

  public form: FormGroup | any;

  @Input() public selectedMovie: Movie | any;

  public onEdition: boolean = false;

  public prompt: boolean = false;

  public inputBorrado: number = 0;

  constructor(
    private fb: FormBuilder,
    private as: ActorService,
    private ms: MovieService,
    private blob: BlobStorageService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(): void {

    if (this.form) {
      this.form.patchValue({
        uid: this.selectedMovie.uid,
        nombre: this.selectedMovie.nombre,
        tipo: this.selectedMovie.tipo,
        estreno: this.selectedMovie.estreno,
        publico: this.selectedMovie.publico,
        imageUrl: this.selectedMovie.imageUrl
      });
      this.form.disable();
      this.inputBorrado = 1;
    }
  }

  initForm() {
    // Profile Info Form Initialization
    this.form = this.fb.group({
      id: '',
      nombre: '',
      tipo: '',
      estreno: '',
      publico: '',
      imageUrl: '',
    });
  }

  delete() {
    this.ms.deleteMovie(this.selectedMovie);
    this.form.reset();
  }
}