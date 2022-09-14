import dayjs from 'dayjs/esm';
import { IAuthor } from 'app/entities/author/author/author.model';
import { ITag } from 'app/entities/author/tag/tag.model';

export interface IBook {
  id: number;
  title?: string | null;
  content?: string | null;
  date?: dayjs.Dayjs | null;
  author?: Pick<IAuthor, 'id' | 'name'> | null;
  tags?: Pick<ITag, 'id' | 'name'>[] | null;
}

export type NewBook = Omit<IBook, 'id'> & { id: null };
