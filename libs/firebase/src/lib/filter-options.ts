import { CollectionReference, Query } from './firebase-types';

export interface FilterOptions {
  /**
   * @description
   * Order by `createdAt` property.
   */
  sort?: 'asc' | 'desc';
  skip?: number;
  limit?: number;
  timerange?: {
    start?: number;
    end?: number;
  };
  search?: string;
}

export const applyFilters = <T>(collection: CollectionReference<T> | Query<T>, options: FilterOptions): Query<T> => {
  let query = collection.orderBy('createdAt', options.sort ?? 'desc');
  if (options.limit) query = query.limit(options.limit);
  if (options.skip) query = query.startAfter(options.skip);
  if (options.timerange?.start) query = query.where('createdAt', '>=', options.timerange.start);
  if (options.timerange?.end) query = query.where('createdAt', '<=', options.timerange.end);
  return query;
};
