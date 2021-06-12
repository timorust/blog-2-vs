import { Component, OnInit } from '@angular/core';
import { PostInterface } from 'src/app/post.interface';
import { AuthService } from 'src/app/services/auth.service';
import { CoreService } from 'src/app/services/core.service';
import { UserInterface } from 'src/app/user.interface';

@Component({
  selector: 'vb-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.scss']
})
export class PostsPageComponent implements OnInit {

  blogPosts: PostInterface[];
  user: UserInterface;
  userSub;

  constructor(private coreService: CoreService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user: UserInterface) => {
      this.user = user;
      this.getBlogPosts();
    })
  }

  getBlogPosts() {
    this.coreService.getBlogPosts().subscribe((posts: PostInterface[]) => {
      this.blogPosts = posts;

      this.blogPosts.forEach(postItem => {
        postItem.userId = this.user.uid;

        this.coreService.copyDataFromPlaceholder(postItem).then(() => {
        })
      })

    })
  }

}
