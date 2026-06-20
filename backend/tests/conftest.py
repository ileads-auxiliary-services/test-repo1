import os
import sys
from pathlib import Path

# Ensure backend/ is importable and mock mode is on for all tests.
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
os.environ.setdefault("BEDROCK_MOCK", "true")
