import { CommentInterface } from "./comment.interface";

export interface PostInterface {
  userId: string;
  id: string;
  title: string;
  body: string;
  comments: CommentInterface[];
}
