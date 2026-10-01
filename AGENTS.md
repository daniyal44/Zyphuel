# Multi-Agent Coordination Protocol: AITMPL Ecosystem

## Agent Architecture
This project has access to **425 specialized subagents** across 28 functional domains:
- **Architecture & Modernization**: `architecture-critic`, `scaffolder`, `legacy-analyst`, `version-delta-analyst`
- **Quality & Security**: `security-auditor`, `test-engineer`, `code-simplifier`, `accessibility-tester`
- **Domain Specialists**: Cloud (AWS, Azure, GCP), Data (Airflow, BigQuery, ClickHouse), Web (React, Next.js, Vite), AI/ML (Deep Research, Prompt Engineering)

## Coordination Rules
1. **Discovery**: Look up agent instructions in `.claude/agents/<agent-name>.md` or `.agents/agents/<agent-name>.md`.
2. **Execution**: Activate skills corresponding to agent specialties from `.agents/skills/<skill-name>/SKILL.md`.
3. **Tools**: Use MCP tools declared in `.mcp.json` when external execution is required.
4. **Automated Documentation Updates (MANDATORY)**:
   - Every single page and subpage has a dedicated `.md` documentation file in `docs/pages/` and `docs/pages/subpages/` (indexed in `docs/README.md`).
   - Whenever ANY change, refactor, styling update, pricing modification, or feature addition is made to any page, component, or data file, you **MUST ALWAYS** immediately update the corresponding `.md` file with the exact modifications, updated parameters, and changelog.

## Core Business Logic & Pricing Rules (Permanent Memory)
- **Refueling Targets**: Strictly 4 application targets (Car/Sedan/SUV, Motorbike/Scooter, Standby Generator, Commercial Machinery). Jerrycan / Safe Storage Drum is completely removed.
- **Minimum & Maximum Fuel Volume**: Strictly **5 Litres minimum** up to **15 Litres maximum** per doorstep delivery order (sub-5L clamped to 5L, capped at 15L max; step: +1L; chips: `[5, 7, 10, 12, 15]` with 15L Max capacity indicator).
- **Doorstep Delivery Charges**: Fixed **Rs. 300.00** nominal fee for orders up to **10 Litres** (5L–10L). For high-capacity orders between **11 Litres and 15 Litres Max**, fees are strictly scaled between **Rs. 300.00 and Rs. 400.00** with a linear +Rs. 20/L step (11L = Rs. 320, 12L = Rs. 340, 13L = Rs. 360, 14L = Rs. 380, 15L = Rs. 400). Do not display legacy `(Order <10)` or `Fixed Rate (≤10L)` tags.
- **Retail Pump Margin Markup**: Controlled margin of **+Rs. 5.00/L** (`PUMP_RATE_MARKUP = 5.00`) across Petrol, Diesel, and High-Octane over official OGRA ex-depot rates.
- **Urgent Delivery Surcharge**: Controlled, reasonable priority fee of **+Rs. 100.00** flat. Always keep this surcharge reasonable.
- **Delivery Windows**:
  - Simple Dispatch: 20–45 Mins
  - Urgent Dispatch: 10–20 Mins
- **Online Order Intake & Office Operating Hours**:
  - Online doorstep order placement & dispatch operates **24/7 continuously on-demand** (never show red "Closed" blocking popups or prevent order placement).
  - Corporate support & desk verification schedule:
    - Monday – Thursday: 8:00 AM – 8:00 PM
    - Friday: 8:00 AM – 1:00 PM
    - Saturday – Sunday: 10:00 AM – 6:00 PM
- **Startup Identity**: Single persistent transparency statement on Home hero; never duplicated on child pages.
- **Automated Dispatch & WhatsApp**: Direct WhatsApp pre-filled dispatch link to `+92 3230-112464`.


