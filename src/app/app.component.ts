import { Component, OnInit } from "@angular/core";
import { AuthService } from "./services/auth.service";
import { UserInterface } from "./user.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  user: UserInterface | null;
  userSub;

  constructor(private authservice: AuthService) {

  }

  ngOnInit() {
    this.getUser();
  }

  getUser(auth?) {
    if(this.userSub) this.userSub.unsubscribe();
    this.userSub = this.authservice.user.subscribe(async(userDoc: UserInterface | undefined | null) => {
      if(userDoc === undefined) {
        await this.authservice.createUserDoc(auth)
      }
      else {
        this.user = userDoc;
      }
    })
  }

  register() {
    this.authservice.signInWithGoogle().then(auth => {
      this.getUser(auth.user);
    })
  }


  logOut() {
    this.authservice.logOut();
  }


}
