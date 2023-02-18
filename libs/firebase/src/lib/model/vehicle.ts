/* eslint-disable @typescript-eslint/no-explicit-any */
import { CollectionUnit } from '../collection';
import { applyFilters, FilterOptions } from '../filter-options';
import { DocumentReference, FirebaseStorage } from '../firebase-types';
import { Entity } from './base';

export class Snapshot extends Entity {
  content: string;

  constructor(data: Snapshot) {
    super(data);
    this.content = data.content;
  }
}

interface IVideo extends Entity {
  /**
   * @description
   * 이 id로 firebase storage에 저장
   */
  videoId: string;
}

export class Video extends Entity implements IVideo {
  videoId: string;

  constructor(data: IVideo, private readonly storage: FirebaseStorage) {
    super(data);
    this.videoId = data.videoId;
  }

  /**
   * @todo Handle other video formats
   */
  async getVideoUrl(): Promise<string> {
    return this.storage.ref(`videos/${this.videoId}.mp4`).getDownloadURL();
  }
}

export class Deformation extends Entity {
  content: string;

  constructor(data: Deformation) {
    super(data);
    this.content = data.content;
  }
}

interface IVehicleInfo {
  /**
   * @description
   * 차량 고유 번호
   */
  carId: string;
}

class VehicleInfo implements IVehicleInfo {
  carId: string;

  constructor(data: IVehicleInfo) {
    this.carId = data.carId;
  }

  /**
   * @todo Load real model from server or API
   */
  async load() {
    return;
  }

  /**
   * @todo Return real model name
   */
  get modelName(): string {
    return 'Elantra';
  }
}

interface VehicleMetrics {
  /**
   * @description
   * 0 ~ 1
   */
  batteryLevel: number;
  /**
   * @description
   * Unit in km
   */
  maximumRange: number;
  distanceDriven: number;
}

export interface IVehicle extends Entity {
  serialCode: string;
  info: VehicleInfo;
  metrics: VehicleMetrics;
  snapshots: CollectionUnit<Snapshot>;
  videos: CollectionUnit<Video>;
  deformations: CollectionUnit<Deformation>;
}

export class Vehicle implements IVehicle {
  id: string;
  createdAt: number;
  serialCode: string;
  info: VehicleInfo;
  metrics: VehicleMetrics;
  snapshots: CollectionUnit<Snapshot>;
  videos: CollectionUnit<Video>;
  deformations: CollectionUnit<Deformation>;

  constructor(data: IVehicle) {
    this.id = data.id;
    this.createdAt = data.createdAt;
    this.serialCode = data.serialCode;
    this.info = new VehicleInfo(data.info);
    this.metrics = data.metrics;
    this.snapshots = data.snapshots;
    this.videos = data.videos;
    this.deformations = data.deformations;
  }

  static async fromRef(ref: DocumentReference, storage: FirebaseStorage): Promise<Vehicle> {
    const document = await ref.get();
    if (!document.exists) {
      throw new Error("[FirebaseException] Document doesn't exist");
    }
    const { serialCode, info, id, createdAt, metrics } = document.data() as IVehicle;
    return new Vehicle({
      id,
      createdAt,
      serialCode,
      info,
      metrics,
      snapshots: new CollectionUnit(ref.collection('snapshot') as any, (data) => new Snapshot(data)),
      videos: new CollectionUnit(ref.collection('video') as any, (data) => new Video(data, storage)),
      deformations: new CollectionUnit(ref.collection('deformation') as any, (data) => new Deformation(data)),
    });
  }

  async listSnapshots(options: FilterOptions): Promise<Snapshot[]> {
    return this.snapshots.filter((collection) => applyFilters(collection, options));
  }

  async listVideos(options: FilterOptions): Promise<Video[]> {
    return this.videos.filter((collection) => applyFilters(collection, options));
  }

  async listDeformations(options: FilterOptions): Promise<Deformation[]> {
    return this.deformations.filter((collection) => applyFilters(collection, options));
  }

  async getSnapshot(id: string): Promise<Snapshot> {
    const snapshots = await this.snapshots.filter((collection) => collection.where('id', '==', id).limit(1));
    if (snapshots.length === 0) throw new Error(`[FirebaseException] Snapshot with id ${id} doesn't exist`);
    return snapshots[0];
  }

  async getVideo(id: string): Promise<Video> {
    const videos = await this.videos.filter((collection) => collection.where('id', '==', id).limit(1));
    if (videos.length === 0) throw new Error(`[FirebaseException] Video with id ${id} doesn't exist`);
    return videos[0];
  }

  async getDeformation(id: string): Promise<Deformation> {
    const deformations = await this.deformations.filter((collection) => collection.where('id', '==', id).limit(1));
    if (deformations.length === 0) throw new Error(`[FirebaseException] Deformation with id ${id} doesn't exist`);
    return deformations[0];
  }
}
