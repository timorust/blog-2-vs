import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostInterface } from 'src/app/post.interface';
import { AuthService } from 'src/app/services/auth.service';
import { CoreService } from 'src/app/services/core.service';
import { UserInterface } from 'src/app/user.interface';

@Component({
  selector: 'vb-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.scss']
})
export class PostsPageComponent implements OnInit, OnDestroy {

  posts: PostInterface[];
  postsSub;

  user: UserInterface;
  userSub;

  constructor(private coreService: CoreService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user: UserInterface) => {
      this.user = user;
    })
    this.getBlog();
  }

  ngOnDestroy() {
    if(this.userSub) this.userSub.unsubscribe();
    if(this.postsSub) this.postsSub.unsubscribe();
  }

  getBlog() {
    this.postsSub = this.coreService.getPosts().subscribe((data: any) => {
      this.posts = data;
    })
    console.log(this.posts);
  }

}

