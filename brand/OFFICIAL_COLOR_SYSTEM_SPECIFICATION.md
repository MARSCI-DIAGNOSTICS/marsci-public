
MARSCI DIAGNOSTICS
OFFICIAL COLOR SYSTEM SPECIFICATION
Version 1.2 — COMPLETE DESIGN STANDARD
Status: Locked Production Specification

Purpose
This specification defines the complete color architecture
for MarSci Diagnostics.

The system is designed for an analytics SaaS product where

• brand authority must be preserved
• dashboards must remain readable during long analytical sessions
• chart data must remain interpretable
• UI behavior must remain consistent across the product

This document defines every color layer required for a
production analytics platform.

The system contains the following layers

1. Brand Identity
2. Interface Surfaces
3. Neutral Structural Ladder
4. KPI Visualization Colors
5. Gradient Data Scales
6. Categorical Chart Palette
7. Extended Chart Palette
8. Chart Container Rules
9. Semantic UI States
10. Interaction States
11. Dark Mode Chart Adjustments
12. Accessibility Standards
13. Design Tokens



────────────────────────────────
1. BRAND IDENTITY COLORS
────────────────────────────────

Deep System Navy
HEX #0A1A2F

Role
Primary brand foundation.

Usage
• global backgrounds
• navigation
• hero sections
• dark dashboards

Meaning
Authority
Institutional intelligence
Analytical seriousness



Imperial Insight Gold
HEX #D4A017

Role
Strategic highlight color.

Usage
• primary CTA
• insight indicators
• premium highlights

Gold Usage Rule

Gold must remain scarce.

Allowed usage
3–5% of total interface surface.



Gold Shade System

Gold Light
#E3B94B

Gold Dark
#B28713



────────────────────────────────
2. INTERFACE SURFACE COLORS
────────────────────────────────

Ivory Intelligence Surface
HEX #F5F1E6

Role
Primary light interface surface.

Usage
• reports
• cards
• tables
• documentation


Graphite System Text
HEX #3A3F47

Role
Primary typography color.


Analytical Silver
HEX #A9B3C1

Role
Secondary text and UI labels.



────────────────────────────────
3. NEUTRAL STRUCTURAL LADDER
────────────────────────────────

Level 1
Ivory Surface
#F5F1E6

Level 2
Soft Neutral
#D6DBE3

Level 3
Analytical Silver
#A9B3C1

Level 4
Divider Gray
#6E7785

Level 5
Graphite
#3A3F47

Level 6
Deep System Base
#1E2329



Usage Examples

Table border
Level 2

Gridline
Level 3

Inactive UI
Level 4

Sidebar panels
Level 6



────────────────────────────────
4. KPI VISUALIZATION COLORS
────────────────────────────────

Positive KPI
Insight Emerald
#2FA87C

Negative KPI
Alert Crimson
#C7363F

Information / Diagnostic
Diagnostic Blue
#3F6AE0



Charts must not use brand colors
to encode data.



────────────────────────────────
5. DATA GRADIENT SCALES
────────────────────────────────

Positive Gradient

Level 1
#D8F3E8

Level 2
#9BDDC6

Level 3
#2FA87C



Negative Gradient

Level 1
#F5D3D6

Level 2
#E47B82

Level 3
#C7363F



Neutral Data Gradient

Level 1
#F2F4F7

Level 2
#D6DBE3

Level 3
#6E7785



────────────────────────────────
6. CATEGORICAL CHART PALETTE
────────────────────────────────

Category A
#3F6AE0

Category B
#2FA87C

Category C
#D4A017

Category D
#6E7785

Category E
#9BDDC6



Usage
Segment comparison charts

bar charts
pie charts
stacked charts



────────────────────────────────
7. EXTENDED CHART PALETTE
────────────────────────────────

Used when more than 5 segments appear.

Category F
#B28713

Category G
#7A9CF0

Category H
#5BBE9A

Category I
#D66A71



Expansion Rule

Prefer extending within existing palette families
before introducing new hues.



────────────────────────────────
8. CHART CONTAINER RULE
────────────────────────────────

Charts must appear on

Ivory Surface
#F5F1E6

or

Deep System Base
#1E2329



Charts must not be placed directly on

gradient backgrounds
brand gold backgrounds
random colored surfaces



────────────────────────────────
9. SEMANTIC UI STATES
────────────────────────────────

Success
#2FA87C

Warning
#F0B429

Error
#C7363F

Information
#3F6AE0



────────────────────────────────
10. INTERACTION STATES
────────────────────────────────

Hover

Gold Light
#E3B94B



Active

Gold Dark
#B28713



Disabled

Soft Neutral
#D6DBE3



Focus Outline

Diagnostic Blue
#3F6AE0



────────────────────────────────
11. DARK MODE CHART ADJUSTMENT
────────────────────────────────

When charts appear on dark background
(#1E2329) the following colors must be used.



Positive
#38C693

Negative
#E95B63

Info
#5D83FF



────────────────────────────────
12. ACCESSIBILITY STANDARDS
────────────────────────────────

All text and chart elements must comply with
WCAG 2.1 AA.



Minimum contrast

Body text
4.5 : 1

Large text
3 : 1

Chart elements
3 : 1



Approved high contrast pairs

Graphite
#3A3F47

on

Ivory
#F5F1E6



White
#FFFFFF

on

Deep System Base
#1E2329



Gold
#D4A017

on

Deep System Navy
#0A1A2F



────────────────────────────────
13. GLOBAL COLOR RATIO
────────────────────────────────

Deep System Navy        60%
Ivory Surface           25%
Neutrals                10%
Gold Accent             3–5%
Data Colors             1–2%



────────────────────────────────
14. DESIGN TOKENS
────────────────────────────────

Brand

--brand-navy: #0A1A2F
--brand-gold: #D4A017



Surfaces

--surface-primary: #F5F1E6
--surface-dark: #1E2329



Typography

--text-primary: #3A3F47
--text-secondary: #A9B3C1



KPI signals

--kpi-positive: #2FA87C
--kpi-negative: #C7363F
--kpi-info: #3F6AE0



Chart palette

--chart-a: #3F6AE0
--chart-b: #2FA87C
--chart-c: #D4A017
--chart-d: #6E7785
--chart-e: #9BDDC6

--chart-f: #B28713
--chart-g: #7A9CF0
--chart-h: #5BBE9A
--chart-i: #D66A71



────────────────────────────────
END OF COLOR SYSTEM SPEC
────────────────────────────────