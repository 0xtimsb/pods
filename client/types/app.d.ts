export interface CardType {
  id: string;
  title: string;
  description?: string;
}

export interface ColumnType {
  id: string;
  title: string;
  cardIds: string[];
}
