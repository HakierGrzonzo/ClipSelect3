from asyncio import gather
from logging import getLogger
from typing import Dict

import ffmpeg
from .chromadb import enroll_episode

from app.models import Media, MediaMetaInformation, Season, Series
from .utils import run_ffmpeg_async, batch
from .subtitle_parser import parse_srt_string

logger = getLogger(__name__)

def rate_stream(stream: Dict) -> int:
    criteria = [
        lambda d: -1 if d["disposition"]["hearing_impaired"] else 0,
        lambda d: -2 if d["disposition"]["visual_impaired"] else 0,
        lambda d: -80 if "songs" in d["tags"].get("title", "").lower() else 0,
        lambda d: -80 if "sign" in d["tags"].get("title", "").lower() else 0,
        lambda d: 10 if "full" in d["tags"].get("title", "").lower() else 0,
        lambda d: -1 if "forced" in d["tags"].get("title", "").lower() else 0,
    ]
    return sum([c(stream) for c in criteria])


def rate_audio(stream: Dict) -> int:
    criteria = [
        lambda d: 2 if d["tags"].get("language", "").lower() == "jpn" else 0,
        lambda d: 1 if d["tags"].get("language", "").lower() == "eng" else 0,
        lambda d: -1 if d["tags"].get("language") is None else 0,
    ]
    return sum(
        [c(stream) for c in criteria]
    )

async def extract_captions_from_media(media: Media, series: Series, season: Season) -> Media:
    logger.info(f"Starting import of {media.name}")
    probed = ffmpeg.probe(media.file_path)
    subtitles = list(
        stream
        for stream in probed["streams"]
        if stream["codec_type"] == "subtitle"
        and stream["tags"].get("language") == "eng"
        and stream["codec_name"] != "hdmv_pgs_subtitle"
    )
    audio = list(
        stream
        for stream in probed["streams"]
        if stream["codec_type"] == "audio"
    )
    if len(audio) < 1:
        raise Exception(f"No audio found! {media}")
    if len(subtitles) < 1:
        raise Exception(f"No subtitles found! {media}")
    best_subs = sorted(subtitles, key=lambda v: -rate_stream(v))[0]
    best_audio = sorted(audio, key=lambda v: -rate_audio(v))[0]
    caption_meta = MediaMetaInformation(audio_track_index=best_audio["index"], subtitle_track_index=best_subs["index"])

    raw_subs, _ = await run_ffmpeg_async(
        ffmpeg.input(media.file_path)[f'{caption_meta.subtitle_track_index}'].output(
            "pipe:", f="srt"
        )
    )

    media.meta = caption_meta
    media.captions = list(parse_srt_string(raw_subs.decode()))
    enroll_episode(media, series.name, season.ordinal)
    logger.info(f"Finished import of {media.name}, imported {len(media.captions)} captions")
    return media

async def process_caption_for_series(series: Series) -> Series:
    logger.info(f"Started import of {series.name}")
    for season in series.seasons:
        for items in batch(season.episodes, 4):
            await gather(*[extract_captions_from_media(media, series, season) for media in items])

    logger.info(f"Finished import of {series.name}")
    return series
        
