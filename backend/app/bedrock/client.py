"""Thin Bedrock client wrapper.

Single responsibility: send a list of chat messages + a system prompt to a
Claude model on Bedrock and return the text completion. Both higher-level calls
(be-the-customer and score-the-transcript) go through here, which keeps them
cleanly separated from transport concerns and individually testable.

When ``BEDROCK_MOCK`` is true (default for local/CI), no AWS call is made; a
deterministic stub is used instead so the whole pipeline — including the
Step-Zero calibration — runs with zero spend.
"""
from __future__ import annotations

import json
from typing import Callable

from ..config import get_settings

# Type alias: a mock handler takes (system, messages) and returns text.
MockHandler = Callable[[str, list[dict]], str]


class BedrockClient:
    def __init__(self, mock_handler: MockHandler | None = None):
        self._settings = get_settings()
        self._mock_handler = mock_handler
        self._runtime = None  # lazy boto3 client

    def _client(self):
        if self._runtime is None:
            import boto3  # imported lazily so tests/mock never need boto3 configured

            self._runtime = boto3.client("bedrock-runtime", region_name=self._settings.aws_region)
        return self._runtime

    def complete(
        self,
        system: str,
        messages: list[dict],
        *,
        max_tokens: int = 1024,
        temperature: float = 0.4,
    ) -> str:
        """messages: [{"role": "user"|"assistant", "content": "..."}]"""
        if self._settings.bedrock_mock:
            if self._mock_handler is None:
                raise RuntimeError("BEDROCK_MOCK is on but no mock_handler was provided.")
            return self._mock_handler(system, messages)

        body = {
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": max_tokens,
            "temperature": temperature,
            "system": system,
            "messages": [
                {"role": m["role"], "content": [{"type": "text", "text": m["content"]}]}
                for m in messages
            ],
        }
        resp = self._client().invoke_model(
            modelId=self._settings.bedrock_model_id,
            body=json.dumps(body),
        )
        payload = json.loads(resp["body"].read())
        # Claude on Bedrock returns content as a list of blocks.
        return "".join(block.get("text", "") for block in payload.get("content", []))

    @property
    def model_id(self) -> str:
        return self._settings.bedrock_model_id
