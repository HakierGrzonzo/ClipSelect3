import aiofiles
from asyncio import create_subprocess_exec, subprocess
from os import path
from bs4 import BeautifulSoup as Soup
from typing import AsyncGenerator, Literal, Tuple
import ffmpeg

MEDIA_FILE_EXTENSIONS = ['mkv']

async def get_title_from_nfo(base_path: str, scope: Literal["season", "tvshow", "episode"]) -> Tuple[str, int | None]:
    if scope == "episode":
        nfo_path = base_path
    else:
        nfo_path = path.join(base_path, f"{scope}.nfo")
    async with aiofiles.open(nfo_path, "r") as nfo:
        nfo_raw_data = await nfo.read()

    nfo = Soup(nfo_raw_data, features='lxml')

    try:
        name = nfo.find("title").text

        if scope == 'season':
            ordinal = int(nfo.find('seasonnumber').text)
        elif scope == 'episode':
            ordinal = int(nfo.find('episode').text)
        else:
            ordinal = None
        return name, ordinal
    except AttributeError as e:
        print(f"----\nIn {base_path} and {scope}:")
        print(nfo)
        raise e



def get_media_file_extension(path: str):
    extension = path.split(".")[-1]
    if extension not in MEDIA_FILE_EXTENSIONS:
        return False
    return extension



async def run_ffmpeg_async(
    ffmpeg_stream, input: None | bytes = None
) -> Tuple[bytes, bytes]:
    """
    Runs ffmpeg expresions from `ffmpeg-python` with asyncio

    ARGS:
        ffmpeg_stream - stream from `ffmpeg-python`
    """
    cmd_line = ffmpeg_stream.compile()
    proc = await create_subprocess_exec(
        cmd_line[0],
        *cmd_line[1:],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        stdin=subprocess.PIPE if input else None,
    )
    out, error = await proc.communicate(input)
    if await proc.wait() != 0:
        raise Exception(
            f"Failed to run ffmpeg: {cmd_line}\n\n {error.decode()}"
        )
    return out, error

async def run_ffmpeg_generator(ffmpeg_stream) -> AsyncGenerator[bytes, None]:
    """
    Runs ffmpeg expresions from `ffmpeg-python` with asyncio

    ARGS:
        ffmpeg_stream - stream from `ffmpeg-python`
    """
    cmd_line = ffmpeg_stream.compile()
    proc = await create_subprocess_exec(
        cmd_line[0],
        *cmd_line[1:],
        stdout=subprocess.PIPE,
        stdin=subprocess.PIPE,
    )
    while proc.stdout:
        data = await proc.stdout.read(1024)
        if len(data) == 0:
            break
        yield data
    await proc.wait()

