from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
SELF = Path(__file__).resolve()
PHRASES = [
    'analytics platform',
    'analytics system',
    'marketing ai',
    'ai system',
    'ai platform',
    'campaign optimizer',
    'advertising automation system',
    'reporting dashboard platform',
    'pattern recognition',
    'decision engine',
    'scoring engine',
    'scoring system',
    'algorithm',
    'automation engine',
    'internal engine',
    'internal systems architecture',
    'threshold logic',
    'classification logic',
    'routing logic',
    'proprietary diagnostic engine',
    'protected system analysis',
]
GARBLED_RE = re.compile(r'\?{3,}')

candidates = []
for path in ROOT.rglob('*'):
    if path == SELF:
        continue
    if path.is_dir():
        continue
    if path.suffix.lower() == '.md' or path.name in {'NOTICE', 'LICENSE'}:
        candidates.append(path)

violations = []
for path in sorted(candidates):
    text = path.read_text(encoding='utf-8', errors='ignore')
    lowered = text.lower()
    for phrase in PHRASES:
        if phrase in lowered:
            violations.append(f"{path.relative_to(ROOT).as_posix()}: {phrase}")
    if GARBLED_RE.search(text):
        violations.append(f"{path.relative_to(ROOT).as_posix()}: garbled_text_question_run")

if violations:
    print('PUBLIC_REPO_SAFETY_FAIL')
    for line in violations:
        print(line)
    sys.exit(1)

print('PUBLIC_REPO_SAFETY_OK')
