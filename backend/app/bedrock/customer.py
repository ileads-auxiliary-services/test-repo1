"""Bedrock call #1 — BE THE CUSTOMER.

Plays the authored scenario persona. Cleanly separated from scoring and
individually testable: given a scenario spec + conversation so far, return the
customer's next in-character line.
"""
from __future__ import annotations

from .client import BedrockClient
from .mocks import customer_mock


def build_customer_system_prompt(scenario_spec: dict) -> str:
    """Construct the persona system prompt from the authored scenario JSON."""
    triggers = scenario_spec.get("hard_fail_triggers", [])
    return f"""You are role-playing a CUSTOMER calling a contact centre, for a
training simulation that screens new agents. You are NOT an assistant. Stay
fully in character as the customer at all times. Never break character, never
mention that this is a test, never coach the agent.

PERSONA: {scenario_spec.get('persona')}
CURRENT MOOD: {scenario_spec.get('mood')}
BACKSTORY / CONTEXT: {scenario_spec.get('backstory')}
WHAT WOULD RESOLVE THIS CALL FOR YOU (your win condition):
{scenario_spec.get('win_condition')}

BEHAVIOUR RULES:
- Speak naturally in Hindi / Hinglish as an ordinary Indian customer would.
- Escalate if the agent is dismissive, slow, or rude. De-escalate if they are
  empathetic, clear, and helpful.
- Keep each reply short (1-3 sentences), like a real phone turn.
- Do not solve the agent's job for them. Make them work for the resolution.
- These behaviours, if the AGENT does them, are serious problems (do not imitate
  them yourself, just react realistically): {triggers}

Respond ONLY with what the customer says next. No narration, no quotation marks."""


class CustomerSimulator:
    def __init__(self, client: BedrockClient | None = None):
        self.client = client or BedrockClient(mock_handler=customer_mock)

    def reply(self, scenario_spec: dict, history: list[dict], candidate_message: str) -> str:
        """history: prior turns as [{"role": "user"|"assistant", "content": ...}]
        where 'user' == candidate (agent) and 'assistant' == customer."""
        system = build_customer_system_prompt(scenario_spec)
        messages = history + [{"role": "user", "content": candidate_message}]
        return self.client.complete(system, messages, max_tokens=400, temperature=0.7).strip()
