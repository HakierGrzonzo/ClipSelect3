import logging
from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware

from app.cache import create_cache_dir
from .admin_paths import router as admin_router
from .search_router import router as search_router
from .browse_router import router as browse_router
from .captions import router as captions_router

logging.root.setLevel(logging.INFO)

app = FastAPI()


@app.get("/")
def redirect_to_docs():
    return RedirectResponse("/docs")


@app.on_event("startup")
def on_startup():
    create_cache_dir()


app.include_router(search_router)
app.include_router(browse_router)
app.include_router(admin_router)
app.include_router(captions_router)

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
