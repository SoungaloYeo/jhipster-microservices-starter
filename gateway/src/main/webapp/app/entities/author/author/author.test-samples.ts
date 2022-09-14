import { IAuthor, NewAuthor } from './author.model';

export const sampleWithRequiredData: IAuthor = {
  id: 82416,
  name: 'generating Home networks',
  handle: 'payment Assistant',
};

export const sampleWithPartialData: IAuthor = {
  id: 83847,
  name: 'District Forward transmit',
  handle: 'Account',
};

export const sampleWithFullData: IAuthor = {
  id: 71035,
  name: 'Frozen Customer',
  handle: 'Administrator Neck',
};

export const sampleWithNewData: NewAuthor = {
  name: 'Small Multi-lateral',
  handle: 'Home Wisconsin',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
