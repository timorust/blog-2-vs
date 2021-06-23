import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostPageComponent } from "./pages/post-page/post-page.component";
import { PostsPageComponent } from "./pages/posts-page/posts-page.component";
import { AddPageComponent } from './pages/add-page/add-page.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/']);

const routes: Routes = [
  {
    path: '',
    component: PostsPageComponent,
    pathMatch:'full'
  },
  {
    path: 'post/:postID',
    component: PostPageComponent
  },
  {
   path: 'add',
   component: AddPageComponent,
   canActivate: [AngularFireAuthGuard],
   data: { authGuardPipe: redirectUnauthorizedToLogin  }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
