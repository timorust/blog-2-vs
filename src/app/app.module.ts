import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from "../environments/environment"
import { AngularFireModule } from '@angular/fire';
import { HttpClientModule} from "@angular/common/http";
import { PostPageComponent } from './pages/post-page/post-page.component';
import { PostsPageComponent } from './pages/posts-page/posts-page.component';
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth"

@NgModule({
  declarations: [
    AppComponent,
    PostPageComponent,
    PostsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    HttpClientModule,
    AngularFireAuthModule,
    AngularFirestoreModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
