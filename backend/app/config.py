"""Application configuration and config-driven rubric / decision loading.

The rubric and the decision thresholds are loaded from YAML files so that QA
leads can tune them WITHOUT touching code. This is a core design constraint:
in V1 the tool replicates human-screener judgment, and that judgment is encoded
entirely in these two files.
"""
from __future__ import annotations

import functools
from pathlib import Path

import yaml
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    database_url: str = "postgresql+psycopg2://postgres:postgres@localhost:5432/screening"

    aws_region: str = "ap-south-1"
    bedrock_model_id: str = "apac.anthropic.claude-sonnet-4-6-v1:0"
    bedrock_mock: bool = True

    rubric_path: str = "config/rubric.yaml"
    decision_path: str = "config/decision.yaml"
    scenario_dir: str = "scenarios"


@functools.lru_cache
def get_settings() -> Settings:
    return Settings()


def _base_dir() -> Path:
    # backend/ — one level up from app/
    return Path(__file__).resolve().parent.parent


@functools.lru_cache
def load_rubric() -> dict:
    """Load the fixed 4-dimension rubric definition."""
    path = _base_dir() / get_settings().rubric_path
    with open(path, "r", encoding="utf-8") as fh:
        return yaml.safe_load(fh)


@functools.lru_cache
def load_decision_config() -> dict:
    """Load the score->decision mapping thresholds."""
    path = _base_dir() / get_settings().decision_path
    with open(path, "r", encoding="utf-8") as fh:
        return yaml.safe_load(fh)


# The four trainable dimensions are FIXED in V1. We assert against the rubric
# file at load time so a typo in YAML can never silently change the contract.
REQUIRED_DIMENSIONS = (
    "language_proficiency",
    "comprehension_listening",
    "composure_under_pressure",
    "coachability",
)
