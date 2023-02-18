from typing import List, TypeVar, Generic, Callable
from client.model.entity import Entity
from google.cloud.firestore import DocumentReference, CollectionReference, Query

import asyncio

T = TypeVar('T', bound=Entity)


class CollectionUnit(Generic[T]):

    def __init__(self, collection: CollectionReference[T],
                 builder: Callable[[dict], T]):
        self.collection = collection
        self.builder = builder

    async def get(self) -> List[T]:
        snapshot = await self.collection.get()
        return [self.builder(doc.to_dict()) for doc in snapshot]

    async def filter(self, query: Callable[[CollectionReference],
                                           Query]) -> List[T]:
        snapshot = await query(self.collection).get()
        return [self.builder(doc.to_dict()) for doc in snapshot]

    async def deleteAll(self):
        snapshot = await self.collection.get()
        for doc in snapshot:
            await doc.reference.delete()

    async def add(self, data: T) -> DocumentReference:
        return self.collection.add(data.to_dict())

    async def addAll(self, data: List[T]) -> List[DocumentReference]:
        return await asyncio.gather(
            *[self.collection.add(datum.to_dict()) for datum in data])
