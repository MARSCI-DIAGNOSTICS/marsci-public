# MarSci Diagnostics

MarSci Diagnostics is a backend-first SaaS product for diagnostic analysis of marketing and business KPI behavior.

## Current Scope

- FastAPI backend for auth, billing, and protected diagnostic output delivery
- Product/legal documentation and deployment notes
- Frontend scaffold for public website and dashboard surfaces

## Current Boundaries

- Core engine libraries and protected detection logic remain separate from the public projection layer
- Stripe and Google OAuth are implemented at the backend layer
- DNS-dependent deployment and live webhook verification are still external/manual steps

## Main Folders

- `api/` HTTP routes
- `services/` backend services
- `frontend/` UI scaffold
- `docs/` product, legal, architecture, and deployment docs
- `contracts/` API and cleanup contracts
- `libraries/` and `mappings/` protected engine data

