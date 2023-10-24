from typing import List
from pydantic import BaseModel


class MediaMetaInformation(BaseModel):
    audio_track_index: int = -1
    subtitle_track_index: int = -1


class Caption(BaseModel):
    text: str
    start: float
    stop: float


class Media(BaseModel):
    file_path: str
    captions: List[Caption]
    name: str
    ordinal: int
    meta: MediaMetaInformation


class Season(BaseModel):
    name: str
    episodes: List[Media]
    ordinal: int


class Series(BaseModel):
    name: str
    cover_path: str
    seasons: List[Season]


class SearchResultMetaData(BaseModel):
    episode: int
    season: int
    series_name: str
    caption: int
    start: float
    stop: float


class SearchResult(SearchResultMetaData):
    text: str
