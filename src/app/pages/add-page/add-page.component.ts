import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CoreService } from 'src/app/services/core.service';
import { UserInterface } from 'src/app/user.interface';

@Component({
  selector: 'vb-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss']
})
export class AddPageComponent implements OnInit {

  addPostForm: FormGroup;

  userSub;
  user: UserInterface;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private coreService: CoreService) { }

  ngOnInit(): void {
    this.buildForm();
    this.getUser();
  }

  getUser() {
    this.userSub = this.authService.user.subscribe((userDoc: UserInterface) => {
      this.user = userDoc;
    })
  }

   addNewPost() {
     if(this.addPostForm.invalid) {
       return alert('Invalid form');
     }
     this.coreService.savePost({
       userId: this.user.uid,
       title: this.addTitle.value,
       score: 0,
       body: this.addBody.value,
       createdAt: Date.now(),
       comments: []
     }).then(() => {
       this.addPostForm.reset();
       alert('Successfily Add!');
     })

  }

  buildForm() {
    this.addPostForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      body: ['', [Validators.required, Validators.maxLength(500)]]
    })
  }

  get addTitle() {
    return this.addPostForm.get('title');
  }

  get addBody() {
    return this.addPostForm.get('body');
  }
}
