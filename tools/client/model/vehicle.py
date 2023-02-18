from google.cloud.storage import Bucket
from client.model.entity import Entity
from client.utils.filters import apply_filters
from google.cloud.firestore import DocumentReference
from client.model.collection_unit import CollectionUnit


class Snapshot(Entity):

    content: str

    def __init__(self, data):
        super().__init__(data)
        self.content = data['content']


class Video(Entity):

    videoId: str

    def __init__(self, data, storage: Bucket):
        super().__init__(data)
        self.videoId = data['videoId']
        self.storage = storage

    async def getVideoUrl(self):
        return self.storage.blob(
            f"videos/{self.videoId}.mp4").generate_signed_url()


class Deformation(Entity):

    content: str

    def __init__(self, data):
        super().__init__(data)
        self.content = data['content']


class VehicleInfo:

    carId: str

    def __init__(self, data):
        self.carId = data['carId']

    async def load(self):
        """
        TODO: Load real vehicle info from DB
        """
        pass

    @property
    def modelName(self):
        """
        TODO: Load real vehicle info from DB
        """
        return "Elantra"


class VehicleMetrics:

    def __init__(self, data):
        self.batteryLevel = data['batteryLevel']
        self.maximumRange = data['maximumRange']
        self.distanceDriven = data['distanceDriven']


class Vehicle(Entity):

    id: str
    createdAt: int
    serialCode: str
    info: VehicleInfo
    metrics: VehicleMetrics
    snapshots: CollectionUnit[Snapshot]
    videos: CollectionUnit[Video]
    deformations: CollectionUnit[Deformation]

    def __init__(self, data):
        super().__init__(data)
        self.id = data['id']
        self.createdAt = data['createdAt']
        self.serialCode = data['serialCode']
        self.info = VehicleInfo(data['info'])
        self.metrics = VehicleMetrics(data['metrics'])
        self.snapshots = data['snapshots']
        self.videos = data['videos']
        self.deformations = data['deformations']

    @staticmethod
    async def from_ref(ref: DocumentReference, storage: Bucket):
        document = await ref.get()
        if not document.exists:
            raise Exception("[FirebaseException] Document doesn't exist")
        data = document.to_dict()
        return Vehicle({
            'id':
            data['id'],
            'createdAt':
            data['createdAt'],
            'serialCode':
            data['serialCode'],
            'info':
            data['info'],
            'metrics':
            data['metrics'],
            'snapshots':
            CollectionUnit(ref.collection('snapshot'),
                           lambda data: Snapshot(data)),
            'videos':
            CollectionUnit(ref.collection('video'),
                           lambda data: Video(data, storage)),
            'deformations':
            CollectionUnit(ref.collection('deformation'),
                           lambda data: Deformation(data))
        })

    async def listSnapshots(self, options):
        return self.snapshots.filter(
            lambda collection: apply_filters(collection, options))

    async def listVideos(self, options):
        return self.videos.filter(
            lambda collection: apply_filters(collection, options))

    async def listDeformations(self, options):
        return self.deformations.filter(
            lambda collection: apply_filters(collection, options))

    async def getSnapshot(self, id):
        snapshots = await self.snapshots.filter(
            lambda collection: collection.where('id', '==', id).limit(1))
        if not snapshots:
            raise Exception(
                f"[FirebaseException] Snapshot with id {id} doesn't exist")
        return snapshots[0]

    async def getVideo(self, id):
        videos = await self.videos.filter(
            lambda collection: collection.where('id', '==', id).limit(1))
        if not videos:
            raise Exception(
                f"[FirebaseException] Video with id {id} doesn't exist")
        return videos[0]

    async def getDeformation(self, id):
        deformations = await self.deformations.filter(
            lambda collection: collection.where('id', '==', id).limit(1))
        if not deformations:
            raise Exception(
                f"[FirebaseException] Deformation with id {id} doesn't exist")
        return deformations[0]
