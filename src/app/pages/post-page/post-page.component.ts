import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostInterface } from 'src/app/post.interface';
import { CoreService } from 'src/app/services/core.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserInterface } from 'src/app/user.interface';

@Component({
  selector: 'vb-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit, OnDestroy {

  userVoted: boolean;

  userSub;
  user: UserInterface;

  post: PostInterface;
  postSub;

  postId: string;

  constructor(private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private router: Router,
              private coreService: CoreService) {
    this.postId = this.activatedRoute.snapshot.paramMap.get('postID');
  }

  ngOnInit(): void {
    this.getPost();
    this.getUser();
  }

  ngOnDestroy() {
    if(this.postSub) this.postSub.unsubscribe();
  }

  getUser() {
    this.userSub = this.authService.user.subscribe((userDoc: UserInterface) => {
      this.user = userDoc;
      this.userVoted = userDoc.voted.includes(this.postId);
    })
  }

  removeThisPost() {
    this.coreService.removePostById(this.postId).then(async () => {
      alert('Delete Successfily!');
      await this.router.navigateByUrl('/');
    })
  }

  getPost() {
    this.postSub = this.coreService.getPost(this.postId).subscribe((postDoc: PostInterface) => {
      this.post = postDoc;
    })
  }

  toggleVote() {
    if(this.userVoted) {
      this.coreService.voteDownPostScore(this.postId, this.user.uid).then(() => {
      alert('Down Voted Successfilly');
    })
    }
    else {
       this.coreService.voteUpPostScore(this.postId, this.user.uid).then(() => {
      alert('Voted Successfilly');
    })
    }

  }

}
