import {Injectable} from "@angular/core";
import * as firebase from 'firebase';

@Injectable()
export class Uploader {

  storageRef: firebase.storage.Reference;

  constructor() {
    this.storageRef = firebase.storage().ref();
  }

  upload(file) {
    let folder = this.storageRef.child('/images/' + file.name);
    let uploadTask = folder.put(file);
    return new Promise((resolve, reject) => {
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
        //
      }, (err) => reject(err), (): any => {
        let fileUrl = uploadTask.snapshot.downloadURL;
        resolve(fileUrl);
      })
    })
  }

  uploadMultiple(files) {
    let promises = [];
    for (let file of files) {
      promises.push(this.upload(file));
    }
    return Promise.all(promises);
  }

}
