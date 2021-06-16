export interface CommentDocInterface {
  comment: CommentInterface[];
}
export interface CommentInterface {
  uid: string;
  displayName:string;
  createdAt: any;
  comment: string;
}
