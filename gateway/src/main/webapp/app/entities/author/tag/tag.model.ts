import { IBook } from 'app/entities/author/book/book.model';

export interface ITag {
  id: number;
  name?: string | null;
  books?: Pick<IBook, 'id'>[] | null;
}

export type NewTag = Omit<ITag, 'id'> & { id: null };
