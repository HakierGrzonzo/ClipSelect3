from os import environ, unlink
import json
from typing import List
import aiofiles

from .models import Series


DB_PATH = environ.get("DB_PATH", "./data.json")

async def load_data() -> List[Series]:
    try: 
        async with aiofiles.open(DB_PATH, "r") as f:
            json_data = await f.read()

    except FileNotFoundError:
        return []

    data = json.loads(json_data)
    return list(Series(**item) for item in data)

async def get_series(key: str) -> Series:
    data = await load_data()
    for x in data:
        if x.name == key:
            return x
    raise KeyError(f"{key} is not found in data")

async def save_data(data: List[Series]):
    raw_data = list(item.model_dump() for item in data)
    json_string = json.dumps(raw_data)
    async with aiofiles.open(DB_PATH, "w+") as f:
        await f.write(json_string)

async def append_data(data: Series):
    all_series = await load_data()

    all_series.append(data)

    await save_data(all_series)

def drop_data():
    unlink(DB_PATH)

