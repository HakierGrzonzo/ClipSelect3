import asyncio
from os import path
from app.models import Media, MediaMetaInformation, Season, Series
from app.utils import get_title_from_nfo
from app.walkers import get_media_files, get_season_folders


async def load_series_from_path(series_path: str) -> Series:
    series_name, _ = await get_title_from_nfo(series_path, "tvshow")

    seasons = await asyncio.gather(
        *[
            load_season_from_path(season_path)
            for season_path in get_season_folders(series_path)
        ]
    )
    seasons.sort(key=lambda item: item.ordinal)

    cover_path = path.join(series_path, "poster.jpg")
    if not path.isfile(cover_path):
        raise ValueError(f"Cover not found for {series_path}!")

    return Series(name=series_name, cover_path=cover_path, seasons=seasons)


async def load_season_from_path(season_path: str) -> Season:
    season_name, ordinal = await get_title_from_nfo(season_path, "season")

    episodes = await asyncio.gather(
        *[
            load_episode_from_path(*paths)
            for paths in get_media_files(season_path)
        ]
    )

    episodes.sort(key=lambda item: item.ordinal)

    return Season(name=season_name, ordinal=ordinal, episodes=episodes)


async def load_episode_from_path(media_file_path: str, nfo_path: str) -> Media:
    title, ordinal = await get_title_from_nfo(nfo_path, "episode")
    return Media(
        file_path=media_file_path,
        ordinal=ordinal,
        name=title,
        captions=[],
        meta=MediaMetaInformation(),
    )
