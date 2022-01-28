import { FormApi } from 'final-form';

export type CommentForm = FormApi<CommentUpdate, Partial<CommentUpdate>>;

export interface CommentUpdate {
  comment: string;
}
