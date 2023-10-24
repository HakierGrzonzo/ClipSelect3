from fastapi import APIRouter, HTTPException, Response
from tempfile import NamedTemporaryFile
from fastapi.responses import StreamingResponse
import ffmpeg

from app.json_database import get_series


from .utils import (
    filter_gif_caption,
    filter_webm_caption,
    run_ffmpeg_async,
    run_ffmpeg_generator,
)

router = APIRouter(prefix="/api/clips", tags=["clips"])


@router.get(
    "/{series_name}/{season}/{episode_ordinal}/{caption_ordinal}/simple"
)
async def get_simple_caption(
    series_name: str,
    season: int,
    episode_ordinal: int,
    caption_ordinal: int,
    format: str = "webm",
):
    series = await get_series(series_name)
    episode = series.seasons[season - 1].episodes[episode_ordinal - 1]
    caption = episode.captions[caption_ordinal]
    print(episode.name)
    timing = {"ss": f"{caption.start}", "t": f"{caption.stop - caption.start}"}
    temp = NamedTemporaryFile("wb+", suffix=".ass")
    subs, _ = await run_ffmpeg_async(
        ffmpeg.input(episode.file_path, **timing)[
            str(episode.meta.subtitle_track_index)
        ].output(
            "pipe:",
            f="ass",
        ),
    )
    temp.write(subs)
    temp.flush()
    filters = {
        "webm": filter_webm_caption,
        "gif": filter_gif_caption,
    }

    async def content_generator():
        async for data in run_ffmpeg_generator(
            filters[format](
                ffmpeg.input(
                    episode.file_path,
                    **timing,
                ),
                temp.name,
                *(
                    [str(episode.meta.audio_track_index)]
                    if format == "webm"
                    else []
                ),
                t=timing["t"],
            )
        ):
            yield data
        temp.close()

    mime = {
        "webm": "video/webm",
        "gif": "image/gif",
    }
    return StreamingResponse(
        content_generator(), headers={"Content-Type": mime[format]}
    )


@router.get(
    "/{series_name}/{season}/{episode_ordinal}/{caption_ordinal_start}/{caption_ordinal_end}/multi"
)
async def get_multi_caption(
    series_name: str,
    season: int,
    episode_ordinal: int,
    caption_ordinal_start: int,
    caption_ordinal_end: int,
):
    if caption_ordinal_end <= caption_ordinal_start:
        raise HTTPException(status_code=422, detail="end <= start")
    series = await get_series(series_name)
    episode = series.seasons[season - 1].episodes[episode_ordinal - 1]
    first_caption = episode.captions[caption_ordinal_start]
    final_caption = episode.captions[caption_ordinal_end]
    timing = {
        "ss": f"{first_caption.start}",
        "t": f"{final_caption.stop - first_caption.start}",
    }
    temp = NamedTemporaryFile("wb+", suffix=".ass")
    subs, _ = await run_ffmpeg_async(
        ffmpeg.input(episode.file_path, **timing)[
            str(episode.meta.subtitle_track_index)
        ].output(
            "pipe:",
            f="ass",
        ),
    )
    temp.write(subs)
    temp.flush()

    async def content_generator():
        async for data in run_ffmpeg_generator(
            filter_webm_caption(
                ffmpeg.input(
                    episode.file_path,
                    **timing,
                ),
                temp.name,
                str(episode.meta.audio_track_index),
                t=timing["t"],
            )
        ):
            yield data
        temp.close()

    return StreamingResponse(
        content_generator(), headers={"Content-Type": "video/webm"}
    )

@router.get(
    "/{series_name}/{season_ordinal}/{episode_ordinal}/thumb"
        )
async def get_thumbnail_for_episode(
    series_name: str,
    season_ordinal: int,
    episode_ordinal: int
):
    series = await get_series(series_name)
    episode = series.seasons[season_ordinal - 1].episodes[episode_ordinal - 1]
    a_random_caption = episode.captions[len(episode.captions) // 6]
    a_random_time = (a_random_caption.start + a_random_caption.stop) / 2
    thumb, _ = await run_ffmpeg_async(
        ffmpeg.input(episode.file_path, ss=f"{a_random_time}")
        .filter("scale", 240, -1)
        .output("pipe:", vframes=1, f="image2", **{"c:v": "mjpeg"})
    )
    return Response(content=thumb, media_type="image/jpeg")
