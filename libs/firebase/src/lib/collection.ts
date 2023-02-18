/* eslint-disable @typescript-eslint/no-explicit-any */
import { CollectionReference, DocumentReference, Query } from './firebase-types';
import { Entity } from './model/base';

export class CollectionUnit<T extends Entity> {
  constructor(public collection: CollectionReference<T>, private builder: (data: any) => T) {}

  async get(): Promise<T[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => doc.data()).map(this.builder);
  }

  async filter(query: (collection: CollectionReference<T>) => Query): Promise<T[]> {
    const snapshot = await query(this.collection).get();
    return snapshot.docs.map((doc) => doc.data()).map(this.builder);
  }

  async deleteAll(): Promise<void> {
    const snapshot = await this.collection.get();
    await Promise.all(snapshot.docs.map((doc) => doc.ref.delete()));
  }

  async add(data: T): Promise<DocumentReference<T>> {
    return this.collection.add(data);
  }

  async addAll(data: T[]): Promise<DocumentReference<T>[]> {
    return Promise.all(data.map((datum) => this.collection.add(datum)));
  }
}
