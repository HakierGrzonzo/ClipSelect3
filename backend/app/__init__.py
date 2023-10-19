from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from .admin_paths import router as admin_router

app = FastAPI()

@app.get("/")
def redirect_to_docs():
    return RedirectResponse("/docs")

app.include_router(admin_router)
