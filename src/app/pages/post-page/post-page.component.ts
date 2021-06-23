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
    })
  }

  removeThisPost() {
    this.coreService.removePostById(this.postId).then(() => {
      alert('Delete Successfily!');
      this.router.navigateByUrl('/');
    })
  }

  getPost() {
    this.postSub = this.coreService.getPost(this.postId).subscribe((postDoc: PostInterface) => {
      this.post = postDoc;
    })
  }

}
