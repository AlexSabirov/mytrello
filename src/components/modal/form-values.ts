import { KeyboardEventHandler } from 'react';

export const initialValues: UserName = { user: 'Гость' };

export interface FieldRenderProps {
  onKeyDown: KeyboardEventHandler<HTMLInputElement>;
}

export interface UserName {
  user: string;
}
