import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CommentInterface } from '../comment.interface';
import { PostInterface } from '../post.interface';
import firebase from 'firebase';
import firestore = firebase.firestore;


@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private afs: AngularFirestore) { }

  removePostById(postId: string) {
    return this.afs.doc(`posts/${postId}`).delete();
  }

  getPosts(): any {
    return this.afs.collection(`posts`).valueChanges({idField: 'id'});
  }

  savePost(post: PostInterface) {
    return this.afs.collection(`posts`).add(post);
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

