import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BlobFile } from '../models/blob-file';
import { Movie } from '../models/movie';
import { BlobStorageService } from './blob-storage.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  default = '';
  constructor(
    private db: AngularFirestore,
    private blob: BlobStorageService
  ) { }

  public getMovies() {
    return this.db
      .collection<Movie>('movies')
      .valueChanges()
      .pipe(catchError(this.handleError));
  }

  async createMovie(profile: Movie, picture: BlobFile | any) {
    if (picture) {
      picture.filename = `movies/${profile.nombre}_${profile.tipo}_${Date.now()}.jpeg`;
      return this.blob.uploadFile(picture)
        .then(imageUrl => {
          profile.imageUrl = imageUrl;
          this.uploadProfile(profile);
        },
          err => console.log(err)
        );
    }
    else {
      profile.imageUrl = this.default;
      return this.uploadProfile(profile);
    }
  }

  async uploadProfile(profile: Movie) {
    return this.db.collection<Movie>("movies").add(profile).then(
      res => {
        let ref = this.db.collection('movies').doc(res.id);
        ref.update({ uid: res.id });
      },
      err => this.handleError(err)
    ).finally();
  }

  async deleteMovie(info: Movie) {
    if (this.default !== info.imageUrl)
      this.blob.deleteFileByUrl(info.imageUrl);
    this.db.collection("movies").doc(info.uid).delete().then(function () {
      console.log("Document successfully deleted!");
    }).catch(function (error) {
      console.error("Error removing document: ", error);
    });
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error ocurred: ${err.error.message}`;
    }
    else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    return throwError(errorMessage);
  }
}
