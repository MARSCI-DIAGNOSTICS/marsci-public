# Legal Routes

Last updated: March 6, 2026

This document defines the canonical legal route structure for MarSci Diagnostics.

## Canonical Routes

- `/legal`
- `/legal/terms`
- `/legal/privacy`
- `/legal/cookies`
- `/legal/subprocessors`
- `/legal/data-rights`
- `/legal/retention`

## Route to File Mapping

- `/legal`
  - `docs/legal/LEGAL_INDEX.md`

- `/legal/terms`
  - `docs/legal/TERMS_AND_CONDITIONS_EN.md`
  - `docs/legal/TERMS_AND_CONDITIONS_TH.md`

- `/legal/privacy`
  - `docs/legal/PRIVACY_POLICY_EN.md`
  - `docs/legal/PRIVACY_POLICY_TH.md`

- `/legal/cookies`
  - `docs/legal/COOKIE_POLICY_EN.md`
  - `docs/legal/COOKIE_POLICY_TH.md`

- `/legal/subprocessors`
  - `docs/legal/SUBPROCESSORS_EN.md`
  - `docs/legal/SUBPROCESSORS_TH.md`

- `/legal/data-rights`
  - `docs/legal/DATA_DELETION_REQUEST_PROCESS_EN.md`
  - `docs/legal/DATA_DELETION_REQUEST_PROCESS_TH.md`

- `/legal/retention`
  - `docs/legal/DATA_RETENTION_POLICY_EN.md`
  - `docs/legal/DATA_RETENTION_POLICY_TH.md`

## Language Structure

Each legal route must support language selection through a query parameter:

- `?lang=en`
- `?lang=th`

Recommended behavior:

- default to English when no language is specified
- serve the English file for `?lang=en`
- serve the Thai file for `?lang=th`
- treat the English version as authoritative if any inconsistency exists between translations

## Implementation Note

This file defines route structure only. It does not require live DNS or deployed routing to be useful.
