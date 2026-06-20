"""FastAPI application entrypoint."""
from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine
from .routers import candidate, recruiter

app = FastAPI(title="BPO Agent Screening Tool", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten for production
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(candidate.router)
app.include_router(recruiter.router)


@app.on_event("startup")
def _startup():
    # V1 convenience: create tables on boot. Use Alembic for real migrations.
    Base.metadata.create_all(bind=engine)


@app.get("/health")
def health():
    return {"status": "ok"}
