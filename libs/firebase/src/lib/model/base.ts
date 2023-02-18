type UNIXTimestamp = number;

export abstract class Entity {
  id: string;
  createdAt: UNIXTimestamp;

  constructor(data: Omit<Entity, 'toJSON'>) {
    this.id = data.id;
    this.createdAt = data.createdAt;
  }
}
