import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentInterface, CommentDocInterface } from 'src/app/comment.interface';
import { PostInterface } from 'src/app/post.interface';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'vb-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  post: PostInterface;
  postSub;

  postId: string;

  comments: CommentInterface[];
  commentSub;

  constructor(private coreService: CoreService,
              private activatedRoute: ActivatedRoute) {

      this.postId = this.activatedRoute.snapshot.paramMap.get('postID');
  }


  ngOnInit(): void {
    this.getPost();
    this.getComment();

  }

  getPost() {
    this.postSub = this.coreService.getPost(this.postId).subscribe((postDoc: PostInterface) => {
      this.post = postDoc;
    })
  }

  getComment() {
    this.commentSub = this.coreService.getComments(this.postId).subscribe(async(commentsDoc: CommentDocInterface) => {

      if(commentsDoc === undefined) {
        await this.coreService.createdCommentDoc(this.postId);
      }
      else {
        this.comments = commentsDoc.comment;
      }

    })
  }

}

