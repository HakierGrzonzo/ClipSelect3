from typing import Iterable, List
from fastapi import APIRouter
from fastapi.responses import FileResponse
from pydantic import BaseModel

from app.json_database import get_series, load_data
from app.models import Caption

router = APIRouter(prefix="/api", tags=["browse"])


class SeriesResponse(BaseModel):
    name: str


@router.get("/series")
async def list_series() -> Iterable[SeriesResponse]:
    data = await load_data()
    return data

@router.get("/series/{series_name}/cover")
async def get_series_cover(series_name: str):
    data = await get_series(series_name)
    return FileResponse(data.cover_path)


class SparseEpisode(BaseModel):
    name: str
    ordinal: int


class SeasonResponse(BaseModel):
    name: str
    episodes: List[SparseEpisode]
    ordinal: int


@router.get("/series/{series_name}")
async def list_seasons_and_episodes(
    series_name: str
) -> Iterable[SeasonResponse]:
    data = await get_series(series_name)
    return data.seasons


@router.get("/series/{series_name}/{season_ordinal}/{episode_ordinal}")
async def get_all_quotes(
    series_name: str, season_ordinal: int, episode_ordinal: int
) -> Iterable[Caption]:
    data = await get_series(series_name)
    return (
        data.seasons[season_ordinal - 1].episodes[episode_ordinal - 1].captions
    )
