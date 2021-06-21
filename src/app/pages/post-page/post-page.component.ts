import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostInterface } from 'src/app/post.interface';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'vb-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit, OnDestroy {

  post: PostInterface;
  postSub;

  postId: string;

  constructor(private activatedRoute: ActivatedRoute,
              private coreService: CoreService) {
    this.postId = this.activatedRoute.snapshot.paramMap.get('postID');
  }

  ngOnInit(): void {
    this.getPost();
  }

  ngOnDestroy() {
    if(this.postSub) this.postSub.unsubscribe();
  }

  getPost() {
    this.postSub = this.coreService.getPost(this.postId).subscribe((postDoc: PostInterface) => {
      this.post = postDoc;
    })
  }

}
