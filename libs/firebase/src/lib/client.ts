/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { applyFilters, FilterOptions } from './filter-options';
import { FirebaseApp, QuerySnapshot, CollectionReference, Query } from './firebase-types';
import { Deformation, Snapshot, Vehicle, Video } from './model';
import firebase from 'firebase';
import { firebaseInitOptions } from './init-options';
import { isDev } from '@hyundai-mobis-hackathon-web-app/constants';

export class FirebaseClient {
  private app: FirebaseApp;

  constructor(app?: FirebaseApp) {
    if (!app) {
      firebase.initializeApp(firebaseInitOptions);
      this.app = firebase.app();
    } else {
      this.app = app;
    }

    if (isDev()) {
      this.db.useEmulator('localhost', 8080);
      this.storage.useEmulator('localhost', 9199);
    }
  }

  private get db() {
    return this.app.firestore();
  }

  private get storage() {
    return this.app.storage();
  }

  get vehicle() {
    return this.db.collection('vehicle');
  }

  get snapshot() {
    return this.db.collectionGroup('snapshot');
  }

  get video() {
    return this.db.collectionGroup('video');
  }

  get deformation() {
    return this.db.collectionGroup('deformation');
  }

  private async queryCollection<T>(collection: CollectionReference<T> | Query<T>, options: FilterOptions): Promise<QuerySnapshot<T>> {
    const query = await applyFilters(collection, options);
    return query.get();
  }

  async listVehicles(options: FilterOptions): Promise<Vehicle[]> {
    const snapshot = await this.queryCollection(this.vehicle, options);
    let vehicles = await Promise.all(snapshot.docs.map((doc) => Vehicle.fromRef(doc.ref, this.storage)));
    if (options.search)
      vehicles = vehicles
        .filter((vehicle) => vehicle.serialCode.toLowerCase().includes(options.search!.toLowerCase()))
        .filter((vehicle) => vehicle.info.carId.toLowerCase().includes(options.search!.toLowerCase()));
    return vehicles;
  }

  async getVehicle(id: string): Promise<Vehicle> {
    const snapshot = await this.vehicle.where('id', '==', id).limit(1).get();
    const ref = snapshot.docs[0].ref;
    const vehicle = await Vehicle.fromRef(ref, this.storage);
    return vehicle;
  }

  async getVehicleBySerialCode(serialCode: string): Promise<Vehicle> {
    const snapshot = await this.vehicle.where('serialCode', '==', serialCode).limit(1).get();
    const ref = snapshot.docs[0].ref;
    const vehicle = await Vehicle.fromRef(ref, this.storage);
    return vehicle;
  }

  async listSnapshots(options: FilterOptions): Promise<Snapshot[]> {
    const snapshot = await this.queryCollection(this.snapshot, options);
    return snapshot.docs.map((doc) => new Snapshot(doc.data() as any));
  }

  async listVideos(options: FilterOptions): Promise<Video[]> {
    const snapshot = await this.queryCollection(this.video, options);
    return snapshot.docs.map((doc) => new Video(doc.data() as any, this.storage));
  }

  async listDeformations(options: FilterOptions): Promise<Deformation[]> {
    const snapshot = await this.queryCollection(this.deformation, options);
    return snapshot.docs.map((doc) => new Deformation(doc.data() as any));
  }
}
