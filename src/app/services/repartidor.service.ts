import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { throwError } from 'rxjs';
import { BlobFile } from '../models/blob-file';
import { Repartidor } from '../models/repartidor';
import { BlobStorageService } from './blob-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RepartidorService {

  default = '../../../assets/default-actor-avatar.jpg';

  constructor(
    private db: AngularFirestore,
    private blob: BlobStorageService,
    private storage: AngularFireStorage
  ) { }
  
  async createRepartidor(profile: Repartidor, picture: BlobFile | any) {
    if (picture) {
      picture.filename = `repartidores/${profile.nombre}_${profile.dni}_${Date.now()}.jpeg`;
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

  async uploadProfile(profile: Repartidor) {
    return this.db.collection("repartidores").add(profile).then(
      res => {
        let ref = this.db.collection('repartidores').doc(res.id);
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
