import { FormApi } from 'final-form';
import { KeyboardEventHandler } from 'react';

export type CardForm = FormApi<CardUpdate, Partial<CardUpdate>>;

export interface CardUpdate {
  card: string;
}

export interface CardUpdateFieldProps {
  onKeyDown: KeyboardEventHandler<HTMLInputElement>;
}
