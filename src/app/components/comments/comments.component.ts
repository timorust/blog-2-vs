import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CoreService } from 'src/app/services/core.service';
import { CommentInterface, CommentDocInterface } from 'src/app/comment.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'vb-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, OnDestroy {


  @Input() postId: string;

  user;
  userSub;

  comments: CommentInterface[];
  commentSub;

  commentForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private coreService: CoreService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.buildForm();
    this.getUser();
    this.getComment();
  }

  ngOnDestroy(): void {
    if (this.userSub) this.userSub.unsubscribe();
    if (this.commentSub) this.commentSub.unsubscribe();
  }

  getUser() {
    this.userSub = this.authService.user.subscribe(userDoc => {
      this.user = userDoc;
    })
  }


  getComment() {
    this.commentSub = this.coreService.getComments(this.postId).subscribe(async (commentsDoc: CommentDocInterface) => {
      if (commentsDoc === undefined) {
        await this.coreService.createdCommentDoc(this.postId);
      }
      else {
        this.comments = commentsDoc.comments;
      }
    })
  }

  buildForm() {
    this.commentForm = this.formBuilder.group({
      commentArea: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]]
    });
  }


  get internal() {
    return this.commentForm.get('commentArea');
  }


  async sendComment() {
    if (!this.commentForm.valid) { return alert('Not Valid!'); }
    const commentRecorder: CommentInterface = {
      uid: this.user.uid,
      comment: this.internal.value,
      createdAt: Date.now(),
      displayName: this.user.displayName,
      photoURL: this.user.photoURL
    }
    await this.coreService.saveComment(this.postId, commentRecorder);
    this.commentForm.reset();
    alert('save Successfully');

  }



  async deleteComment(itemComment) {
    if (this.user.uid != itemComment.uid) return alert('You are not the owner');
    await this.coreService.deleteComments(this.postId, itemComment);
    alert('Success delete');
  }

}
