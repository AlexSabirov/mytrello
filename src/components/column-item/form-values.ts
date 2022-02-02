import { FormApi } from 'final-form';

export const initialValuesCardAdd: CardName = { card: 'new card' };

export interface CardName {
  card: string;
}

export interface ColumnNameUpdate {
  columns: string;
}

export type CardForm = FormApi<CardName, Partial<CardName>>;
export type ColumnForm = FormApi<ColumnNameUpdate, Partial<ColumnNameUpdate>>;
