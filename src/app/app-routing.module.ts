import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostPageComponent } from "./pages/post-page/post-page.component";
import { PostsPageComponent } from "./pages/posts-page/posts-page.component";

const routes: Routes = [
  {
    path: '',
    component: PostsPageComponent,
    pathMatch:'full'
  },
  {
    path: 'post/:postId',
    component: PostPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
