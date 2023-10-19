from fastapi import APIRouter

from .models import Series
from .json_database import append_data, drop_data

from .loaders import load_series_from_path

router = APIRouter(prefix="/admin", tags=["admin"])

@router.post("/register", response_model=Series)
async def register_series(series_path: str):
    series = await load_series_from_path(series_path)

    await append_data(series)

    return series

@router.delete("/drop")
def drop_all_series():
    drop_data()
    

