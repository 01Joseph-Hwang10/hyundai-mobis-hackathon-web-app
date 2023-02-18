import firebase_admin as firebase
from firebase_admin import firestore
from firebase_admin import storage
from google.cloud.firestore import (Client as FirestoreClient,
                                    CollectionReference, DocumentSnapshot)
from google.cloud.storage import Bucket
from client.model.filters import FilterOptions
from client.utils.filters import apply_filters
from client.model.vehicle import Vehicle, Snapshot, Video, Deformation
from typing import Iterable, List


class FirebaseClient:

    def __init__(self, app: firebase.App):
        self.app = app

    def _get_db(self):
        return firestore.client(self.app)

    db: FirestoreClient = property(_get_db)

    def _get_storage(self):
        return storage.bucket(app=self.app)

    storage: Bucket = property(_get_storage)

    @property
    def vehicle(self):
        return self.db.collection('vehicle')

    @property
    def snapshot(self):
        return self.db.collection_group('snapshot')

    @property
    def video(self):
        return self.db.collection_group('video')

    @property
    def deformation(self):
        return self.db.collection_group('deformation')

    async def query_collection(
        self,
        collection: CollectionReference,
        options: FilterOptions,
    ):
        query = apply_filters(collection, options)
        return query.get()

    async def list_vehicles(self, options: FilterOptions):
        snapshot = await self.query_collection(self.vehicle, options)
        vehicles: List[Vehicle] = [
            Vehicle.from_ref(doc.reference, self.storage) for doc in snapshot
        ]
        if options.search:
            vehicles = [
                vehicle for vehicle in vehicles
                if options.search.lower() in vehicle.serialCode.lower()
                or options.search.lower() in vehicle.info.carId.lower()
            ]
        return vehicles

    async def get_vehicle(self, id):
        snapshot: Iterable[DocumentSnapshot] = await self.vehicle.where(
            'id', '==', id).limit(1).get()
        ref = list(snapshot)[0].reference
        vehicle = await Vehicle.from_ref(ref, self.storage)
        return vehicle

    async def get_vehicle_by_serial_code(self, serialCode):
        snapshot: Iterable[DocumentSnapshot] = await self.vehicle.where(
            'serialCode', '==', serialCode).limit(1).get()
        ref = list(snapshot)[0].reference
        vehicle = await Vehicle.from_ref(ref, self.storage)
        return vehicle

    async def list_snapshots(self, options):
        snapshot = await self.query_collection(self.snapshot, options)
        return [Snapshot(doc.get()) for doc in snapshot]

    async def list_videos(self, options):
        snapshot = await self.query_collection(self.video, options)
        return [Video(doc.get(), self.storage) for doc in snapshot]

    async def list_deformations(self, options):
        snapshot = await self.query_collection(self.deformation, options)
        return [Deformation(doc.get()) for doc in snapshot]