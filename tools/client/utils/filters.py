from google.cloud.firestore import CollectionReference
from google.cloud.firestore_v1.base_query import BaseQuery
from model.filters import FilterOptions


def apply_filters(collection: CollectionReference, options: FilterOptions) -> BaseQuery:
    query: BaseQuery = collection.order_by('createdAt', options.sort or 'desc')
    if options.limit:
        query = query.limit(options.limit)
    if options.skip:
        query = query.start_after(options.skip)
    if options.timerange and options.timerange.start:
        query = query.where('createdAt', '>=', options.timerange.start)
    if options.timerange and options.timerange.end:
        query = query.where('createdAt', '<=', options.timerange.end)
    return query
