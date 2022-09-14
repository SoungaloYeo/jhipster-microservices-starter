export interface IAuthor {
  id: number;
  name?: string | null;
  handle?: string | null;
}

export type NewAuthor = Omit<IAuthor, 'id'> & { id: null };
