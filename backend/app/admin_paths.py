from fastapi import APIRouter, BackgroundTasks


from .subtitle_importer import process_caption_for_series

from .models import Series
from .json_database import append_data, drop_data

from .loaders import load_series_from_path

router = APIRouter(prefix="/admin", tags=["admin"])

async def import_task(series: Series):
    series = await process_caption_for_series(series)

    await append_data(series)

@router.post("/register", response_model=Series)
async def register_series(series_path: str, tasks: BackgroundTasks):
    series = await load_series_from_path(series_path)

    tasks.add_task(import_task, series)

    return series

@router.delete("/drop")
def drop_all_series():
    drop_data()
    

