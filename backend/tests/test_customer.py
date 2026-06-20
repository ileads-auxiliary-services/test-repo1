"""The be-the-customer call is independently testable, with no DB and no AWS."""
from app.bedrock import BedrockClient, CustomerSimulator, build_customer_system_prompt


def _scenario():
    return {
        "persona": "Angry customer",
        "mood": "furious",
        "backstory": "Charged twice",
        "win_condition": "Refund",
        "hard_fail_triggers": [{"id": "abusive_language", "label": "abuse"}],
    }


def test_system_prompt_includes_persona_and_rules():
    sp = build_customer_system_prompt(_scenario())
    assert "Angry customer" in sp
    assert "win condition" in sp.lower()
    assert "abusive_language" in sp


def test_customer_reply_uses_injected_mock_handler():
    captured = {}

    def handler(system, messages):
        captured["system"] = system
        captured["last"] = messages[-1]["content"]
        return "Theek hai."

    sim = CustomerSimulator(BedrockClient(mock_handler=handler))
    reply = sim.reply(_scenario(), [], "Sir main madad karta hoon")
    assert reply == "Theek hai."
    assert "madad" in captured["last"]
    assert "Angry customer" in captured["system"]
