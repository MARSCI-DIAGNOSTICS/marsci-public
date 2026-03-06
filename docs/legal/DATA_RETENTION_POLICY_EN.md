# Data Retention Policy

Last updated: March 6, 2026

This Data Retention Policy is a draft for MarSci Diagnostics. It describes the current intended retention approach for key SaaS data categories. Final retention schedules may change based on legal requirements, infrastructure changes, and product implementation details.

## 1. Retention Principles

MarSci Diagnostics may retain data only for as long as reasonably necessary to:

- provide the service,
- maintain account continuity,
- support billing and accounting,
- preserve security and operational integrity,
- troubleshoot issues,
- satisfy legal obligations, and
- enforce contractual rights where applicable.

## 2. User Account Data

Examples:

- name
- email address
- user identifiers
- basic profile fields

Retention approach:

- retained while the account remains active; and
- may be retained for a reasonable period afterward for account recovery, support, audit, dispute handling, or legal compliance.

## 3. OAuth Authentication Metadata

Examples:

- Google OAuth account identifier
- linked account records
- authentication timestamps or related metadata

Retention approach:

- retained while authentication linkage remains necessary for account access and security; and
- may be retained afterward where needed for security, audit, or fraud-prevention reasons.

## 4. Billing Records

Examples:

- Stripe customer references
- checkout session references
- subscription identifiers
- invoice and payment status metadata

Retention approach:

- retained as required for billing operations, accounting, tax, audit, and legal recordkeeping; and
- may be retained beyond account closure where legally required or operationally necessary.

## 5. Platform Integration Metadata

Examples:

- account-level identifiers
- connection metadata
- integration timestamps

Retention approach:

- retained while required for service functionality, account linkage, support, and troubleshooting; and
- may be removed or minimized when no longer necessary, subject to technical and legal constraints.

## 6. Marketing KPI Datasets and Diagnostic Data

Examples:

- uploaded or connected KPI datasets
- diagnostic input history
- diagnostic result history

Retention approach:

- retained while necessary to provide service functionality, maintain historical diagnostic context, support troubleshooting, and operate the product; and
- subject to change depending on storage design, customer controls, and future deletion tooling.

## 7. Logs

Examples:

- access logs
- security logs
- operational logs
- error logs

Retention approach:

- retained for a limited period appropriate to service security, abuse prevention, troubleshooting, and operational monitoring; and
- retention windows may vary by system and severity.

## 8. Exceptions and Legal Holds

Some data may be retained longer if required by law, regulation, dispute handling, audit requirements, fraud prevention, or security response.

## 9. Policy Changes

This policy may be updated as infrastructure, product behavior, and legal obligations evolve.

