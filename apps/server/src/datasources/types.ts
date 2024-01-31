import type { Document } from 'mongoose';

export interface IdToItemMapping<T extends Document> {
  [key: string]: T;
}
