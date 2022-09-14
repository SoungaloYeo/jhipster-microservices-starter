import dayjs from 'dayjs/esm';

import { IBook, NewBook } from './book.model';

export const sampleWithRequiredData: IBook = {
  id: 37098,
  title: 'Jewelery',
  content: '../fake-data/blob/hipster.txt',
  date: dayjs('2022-09-12T16:42'),
};

export const sampleWithPartialData: IBook = {
  id: 60289,
  title: 'synthesize',
  content: '../fake-data/blob/hipster.txt',
  date: dayjs('2022-09-12T04:36'),
};

export const sampleWithFullData: IBook = {
  id: 27659,
  title: 'Wooden GB networks',
  content: '../fake-data/blob/hipster.txt',
  date: dayjs('2022-09-12T21:27'),
};

export const sampleWithNewData: NewBook = {
  title: 'Small pink Analyst',
  content: '../fake-data/blob/hipster.txt',
  date: dayjs('2022-09-12T17:09'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
