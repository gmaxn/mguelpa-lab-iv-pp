import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Actor } from '../models/actor';
import { BlobFile } from './../models/blob-file';
import { BlobStorageService } from './../services/blob-storage.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  default = '../../../assets/default-actor-avatar.jpg';

  constructor(
    private db: AngularFirestore,
    private blob: BlobStorageService,
    private storage: AngularFireStorage
  ) { }
  
  public getActors() {
    return this.db
      .collection<Actor>('actors')
      .valueChanges()
      .pipe(catchError(this.handleError));
  }

  async createActor(profile: Actor, picture: BlobFile | any) {
    if (picture) {
      picture.filename = `actors/${profile.nombre}_${profile.apellido}_${Date.now()}.jpeg`;
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
  
  async uploadProfile(profile: Actor) {
    return this.db.collection("actors").add(profile).then(
      res => {
        let ref = this.db.collection('actors').doc(res.id);
        ref.update({ id: res.id });
      },
      err => this.handleError(err)
    ).finally();
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
