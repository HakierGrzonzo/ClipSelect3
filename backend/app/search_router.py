from typing import Iterable
from fastapi import APIRouter

from app.chromadb import query_series
from app.models import SearchResult

router = APIRouter(tags=["search"], prefix="/api")


@router.get("/search/{series_name}")
def search_series(query: str, series_name: str) -> Iterable[SearchResult]:
    return query_series(series_name, query)
