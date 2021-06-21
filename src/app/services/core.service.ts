import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CommentInterface } from '../comment.interface';
import firebase from 'firebase';
import firestore = firebase.firestore;


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

  saveComment(postId, comment: CommentInterface) {
    return this.afs.doc(`comments/${postId}`).update({
      [`comments`]: firestore.FieldValue.arrayUnion(comment)
    })
  }


  deleteComments(postId, comment: CommentInterface) {
    return this.afs.doc(`comments/${postId}`).update({
      [`comments`]: firestore.FieldValue.arrayRemove(comment)
    })
  }


}

