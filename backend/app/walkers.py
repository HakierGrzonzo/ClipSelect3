from os import listdir, path
from .utils import get_media_file_extension


def get_season_folders(series_path: str):
    for item in listdir(series_path):
        if not item.startswith("Season "):
            continue
        yield path.join(series_path, item)


def get_media_files(season_path: str):
    for item in listdir(season_path):
        if (extension := get_media_file_extension(item)) is False:
            continue
        media_file_path = path.join(season_path, item)

        media_file_nfo_path = (
            media_file_path.removesuffix(f".{extension}") + ".nfo"
        )
        if path.isfile(media_file_nfo_path):
            yield media_file_path, media_file_nfo_path
