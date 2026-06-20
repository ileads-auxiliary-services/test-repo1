"""Seed authored scenarios from the scenarios/ directory into Postgres.

Idempotent: upserts by (tenant_id, slug). Swapping in new scenarios is just
dropping a JSON file in scenarios/ and re-running the seed (see README).
"""
from __future__ import annotations

import json
from pathlib import Path

from sqlalchemy.orm import Session as DbSession

from ..config import get_settings
from ..models import Scenario

DEFAULT_TENANT = "demo-bpo"


def _scenario_files() -> list[Path]:
    base = Path(__file__).resolve().parent.parent.parent / get_settings().scenario_dir
    return sorted(base.glob("*.json"))


def seed_scenarios(db: DbSession, tenant_id: str = DEFAULT_TENANT) -> int:
    count = 0
    for path in _scenario_files():
        spec = json.loads(path.read_text(encoding="utf-8"))
        slug = spec["slug"]
        existing = db.query(Scenario).filter_by(tenant_id=tenant_id, slug=slug).one_or_none()
        if existing is None:
            existing = Scenario(tenant_id=tenant_id, slug=slug)
            db.add(existing)
        existing.title = spec["title"]
        existing.difficulty = spec["difficulty"]
        existing.order_index = spec["order_index"]
        existing.spec = spec
        count += 1
    db.commit()
    return count
