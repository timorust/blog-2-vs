import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private httpClient: HttpClient,
              private afs: AngularFirestore) { }

  getBlogPosts() {
    return this.httpClient.get('https://jsonplaceholder.typicode.com/posts');
  }

  copyDataFromPlaceholder(post) {
    return this.afs.doc(`posts/${post.id}`).set({post});

  }
}
