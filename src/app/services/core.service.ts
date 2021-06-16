import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private afs: AngularFirestore) { }

  getPosts(): any {
    return this.afs.collection(`posts`).valueChanges({idField: 'id'});
  }

  getPost(postId: string): any {
    return this.afs.doc(`posts/${postId}`).valueChanges({ idField: 'id' });
  }

  getComments(postId: string): any {
     return this.afs.doc(`comments/${postId}`).valueChanges();
  }

  createdCommentDoc(postId: string): any {
    return this.afs.doc(`comments/${postId}`).set({comments: []});
  }
}

