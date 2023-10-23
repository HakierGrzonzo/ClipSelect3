from fastapi import APIRouter

from app.json_database import load_data

router = APIRouter(prefix="/api", tags=["browse"])

@router.get("/series")
async def list_series():
    data = await load_data()
    return [series.name for series in data]
