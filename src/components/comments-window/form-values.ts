import { FormApi } from 'final-form';

export type CommentForm = FormApi<CommentName, Partial<CommentName>>;

export interface CommentName {
  comment: string;
}
