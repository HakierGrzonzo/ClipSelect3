from typing import List
from pydantic import BaseModel

class Caption(BaseModel):
    text: str
    start: float
    stop: float

class Media(BaseModel):
    file_path: str
    captions: List[Caption]
    name: str
    ordinal: int

class Season(BaseModel):
    name: str
    episodes: List[Media]
    ordinal: int

class Series(BaseModel):
    name: str
    cover_path: str
    seasons: List[Season]
