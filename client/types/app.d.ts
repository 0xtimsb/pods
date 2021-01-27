export interface CardType {
  id: string;
  title: string;
  description?: string;
}

export interface ListType {
  id: string;
  title: string;
  cardIds: string[];
}
