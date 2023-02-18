from typing import NamedTuple


class Timerange(NamedTuple):
    start: int  # UNIX timestamp
    end: int  # UNIX timestamp


class FilterOptions(NamedTuple):

    sort: str
    skip: int
    limit: int
    timerange: Timerange
    search: str
