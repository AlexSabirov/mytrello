import { FormApi } from 'final-form';
import { KeyboardEventHandler } from 'react';

export const initialValues: ColumnName = { column: 'new column' };

export type BoardForm = FormApi<ColumnName, Partial<ColumnName>>;
export interface ColumnNameRenderProps {
  onKeyDown: KeyboardEventHandler<HTMLInputElement>;
}

export interface ColumnName {
  column: string;
}
