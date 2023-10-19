import aiofiles
from os import path
from bs4 import BeautifulSoup as Soup
from typing import Literal, Tuple, Union

MEDIA_FILE_EXTENSIONS = ['mkv']

async def get_title_from_nfo(base_path: str, scope: Literal["season"] | Literal["tvshow"] | Literal["episode"]) -> Tuple[str, int | None]:
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
